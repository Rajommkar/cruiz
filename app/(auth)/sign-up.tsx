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

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {};

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
