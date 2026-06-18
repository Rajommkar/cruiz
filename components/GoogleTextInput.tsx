import { View, Text, Image } from "react-native";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-start relative z-50 rounded-xl ${containerStyle} mb-5 px-5 py-3`}
    >
      {icon && <Image source={icon} className="w-5 h-5 mr-3" />}
      <Text className="font-JakartaSemiBold text-md">Search</Text>
    </View>
  );
};

export default GoogleTextInput;
