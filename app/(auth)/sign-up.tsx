import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { Alert } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";

const { width } = Dimensions.get("window");

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

  const onSignUpPress = async () => {
    if (!isLoaded) return;

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
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // TODO: Create a database user

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
      contentContainerStyle={styles.scrollContent}
    >
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

          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            style={{ marginTop: 24 }}
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

      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-2xl font-JakartaExtraBold mb-2">
            Verification
          </Text>
          <Text className="font-Jakarta mb-5">
            We've sent a verification code to {form.email}
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
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />

          <Text className="text-3xl font-JakartaBold text-center">
            Verified
          </Text>

          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            You have successfully verified your account.
          </Text>

          <CustomButton
            title="Browse Home"
            onPress={() => {
              setShowSuccessModal(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
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
});

export default SignUp;
