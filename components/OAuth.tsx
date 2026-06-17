import { View, Text, Image, StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = async () => {
    // Google OAuth logic will be implemented in a later chapter
  };

  return (
    <View>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <CustomButton
        title="Log In with Google"
        style={styles.googleButton}
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            style={styles.googleIcon}
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    columnGap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CDE9F6",
  },
  orText: {
    fontSize: 18,
    fontFamily: "Jakarta-Regular",
    color: "#000",
  },
  googleButton: {
    marginTop: 20,
    width: "100%",
    shadowOpacity: 0, // shadow-none
    elevation: 0,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
  },
});

export default OAuth;
