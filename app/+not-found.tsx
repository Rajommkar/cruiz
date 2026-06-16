import { View, Text } from "react-native";
import { Link } from "expo-router";

const NotFound = () => {
  return (
    <View>
      <Text>Not Found</Text>
      <Link href="/">Go to home</Link>
    </View>
  );
};

export default NotFound;
