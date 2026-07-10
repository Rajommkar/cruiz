import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { fetchAPI } from "@/lib/fetch";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";

const { width } = Dimensions.get("window");

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [formError, setFormError] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setFormError("");

    if (!form.name.trim() || !form.name.trim().includes(" ")) {
      setFormError("Please enter your full name (first and last name).");
      return;
    }

    if (!form.email.trim().endsWith("@gmail.com")) {
      setFormError("Please enter a valid @gmail.com email address.");
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.log(err);
      if (err.errors && err.errors.length > 0) {
        setFormError(err.errors[0].longMessage);
      } else {
        setFormError("An unexpected error occurred during sign up.");
      }
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={images.signUpCar}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.headerText}>Create Your Account</Text>
        </View>

        <View style={styles.formContainer}>
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            style={{ marginTop: 24 }}
          />

          {/* DEVELOPMENT ONLY: Skip Authentication button */}
          <CustomButton
            title="Skip Auth (Dev Only)"
            onPress={() => router.replace("/(root)/(tabs)/home")}
            bgVariant="secondary"
            style={{ marginTop: 16 }}
          />

          <OAuth />

          <Link href="/(auth)/sign-in" asChild>
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={styles.linkTextHighlight}>Log In</Text>
            </Text>
          </Link>
        </View>
      </View>

      <Modal
        visible={
          verification.state === "pending" || verification.state === "success"
        }
        transparent={true}
        animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            {verification.state === "pending" ? (
              <>
                <Text className="text-2xl font-JakartaExtraBold mb-2">
                  Verification
                </Text>
                <Text className="font-Jakarta mb-5">
                  We&apos;ve sent a verification code to {form.email}
                </Text>

                <InputField
                  label="Code"
                  icon={icons.lock}
                  placeholder="12345"
                  value={verification.code}
                  keyboardType="numeric"
                  onChangeText={(code) =>
                    setVerification({ ...verification, code })
                  }
                />

                {verification.error ? (
                  <Text className="text-red-500 text-sm mt-1">
                    {verification.error}
                  </Text>
                ) : null}

                <CustomButton
                  title="Verify Email"
                  onPress={onPressVerify}
                  className="mt-5 bg-success-500"
                />
              </>
            ) : (
              <>
                <Image
                  source={images.check}
                  className="w-[110px] h-[110px] mx-auto my-5"
                />

                <Text className="text-3xl font-JakartaBold text-center">
                  Verified!
                </Text>

                <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                  You have successfully verified your account.
                </Text>

                <CustomButton
                  title="Browse Home"
                  onPress={() => {
                    setVerification({ ...verification, state: "default" });
                    router.push("/(root)/(tabs)/home");
                  }}
                  className="mt-5"
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 250,
  },
  image: {
    width: width,
    height: 250,
  },
  headerText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 24,
    color: "#000",
    fontFamily: "Jakarta-SemiBold",
  },
  formContainer: {
    padding: 20,
  },
  linkText: {
    fontSize: 18,
    textAlign: "center",
    color: "#858585", // text-general-200
    marginTop: 40,
    fontFamily: "Jakarta-Regular",
  },
  linkTextHighlight: {
    color: "#0286FF", // text-primary-500
    fontFamily: "Jakarta-SemiBold",
  },
  errorText: {
    color: "red",
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Jakarta-Regular",
    textAlign: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
    paddingVertical: 36,
    borderRadius: 16,
    minHeight: 300,
    width: "91.666%",
  },
});

export default SignUp;
