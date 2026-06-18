import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return { backgroundColor: "#6B7280" }; // gray-500
    case "danger":
      return { backgroundColor: "#EF4444" }; // red-500
    case "success":
      return { backgroundColor: "#10B981" }; // green-500
    case "outline":
      return {
        backgroundColor: "transparent",
        borderColor: "#D4D4D8", // neutral-300
        borderWidth: 0.5,
      };
    default:
      return { backgroundColor: "#0286FF" }; // primary
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return { color: "#000" }; // black
    case "secondary":
      return { color: "#F3F4F6" }; // gray-100
    case "danger":
      return { color: "#FEE2E2" }; // red-100
    case "success":
      return { color: "#D1FAE5" }; // green-100
    default:
      return { color: "#FFF" }; // white
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  style,
  ...props
}: ButtonProps & { style?: any }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, getBgVariantStyle(bgVariant), style]}
      {...props}>
      {IconLeft && <IconLeft />}
      <Text style={[styles.text, getTextVariantStyle(textVariant)]}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 9999, // rounded-full
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12, // p-3
    shadowColor: "#a3a3a3", // shadow-neutral-400
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 18, // text-lg
    fontFamily: "Jakarta-Bold", // font-bold
  },
});

export default CustomButton;
