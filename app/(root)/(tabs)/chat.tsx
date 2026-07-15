import { Image, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row items-center justify-between my-5 px-5">
        <Text className="text-2xl font-JakartaExtraBold">Chat List</Text>
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-200">
          <Image source={icons.out} className="w-5 h-5" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-center px-5 mb-20">
        <Image
          source={images.message}
          className="w-40 h-40"
          resizeMode="contain"
        />
        <Text className="text-2xl font-JakartaBold mt-5">
          No Messages, yet.
        </Text>
        <Text className="text-md text-gray-500 font-JakartaMedium mt-2">
          No messages in your inbox, yet!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
