import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";

const { width } = Dimensions.get("window");

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {};

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

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            style={{ marginTop: 24 }}
          />

          <OAuth />

          <Link href="/(auth)/sign-up" asChild>
            <Text style={styles.linkText}>
              Don't have an account?{" "}
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
});

export default SignIn;
