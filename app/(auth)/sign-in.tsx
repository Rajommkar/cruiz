import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useState, useCallback } from "react";
import { Link, useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";

const { width } = Dimensions.get("window");

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    setFormError("");

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        setFormError("Sign in failed. Please try again.");
      }
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        setFormError(err.errors[0].longMessage);
      } else {
        setFormError("An unexpected error occurred during sign in.");
      }
    }
  }, [isLoaded, form.email, form.password, router, setActive, signIn]);

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
          <Text style={styles.headerText}>Welcome 👋</Text>
        </View>

        <View style={styles.formContainer}>
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
            title="Sign In"
            onPress={onSignInPress}
            style={{ marginTop: 24 }}
          />

          {/* DEVELOPMENT ONLY: Skip Authentication button */}
          <CustomButton
            title="Skip Auth (Dev Only)"
            onPress={() => router.replace("/(root)/(tabs)/home")}
            className="mt-4 bg-gray-500"
          />

          <OAuth />

          <Link href="/(auth)/sign-up" asChild>
            <Text style={styles.linkText}>
              Don&apos;t have an account?{" "}
              <Text style={styles.linkTextHighlight}>Sign Up</Text>
            </Text>
          </Link>
        </View>
      </View>
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
});

export default SignIn;
