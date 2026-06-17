import {
  TextInput,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && (
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        )}
        <TextInput
          style={styles.input}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#A3A3A3"
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontFamily: "Jakarta-SemiBold",
    marginBottom: 12,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#F5F5F5",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  input: {
    borderRadius: 50,
    padding: 16,
    fontFamily: "Jakarta-SemiBold",
    fontSize: 15,
    flex: 1,
    textAlign: "left",
    color: "#000",
  },
});

export default InputField;
