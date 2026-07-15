import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text className="text-2xl font-JakartaExtraBold px-5 my-5">
          Your profile
        </Text>

        <View className="flex items-center justify-center mt-5 mb-10">
          <View className="relative">
            <Image
              source={{
                uri: user?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              }}
              className="w-28 h-28 rounded-full border-[3px] border-white shadow-sm shadow-neutral-300"
            />
            <View className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm shadow-neutral-300">
              <View className="bg-[#0CC25F] rounded-full p-1 items-center justify-center">
                <Ionicons name="shield-checkmark" size={14} color="white" />
              </View>
            </View>
          </View>
        </View>

        <View className="px-5">
          {/* First name */}
          <View className="mb-5">
            <Text className="text-gray-500 font-JakartaMedium mb-2 text-base">First name</Text>
            <View className="flex flex-row items-center justify-between bg-neutral-100 px-4 py-4 rounded-full">
              <Text className="font-JakartaSemiBold text-base flex-1">{user?.firstName || "Marin"}</Text>
              <Ionicons name="create-outline" size={24} color="#333" />
            </View>
          </View>

          {/* Last name */}
          <View className="mb-5">
            <Text className="text-gray-500 font-JakartaMedium mb-2 text-base">Last name</Text>
            <View className="flex flex-row items-center justify-between bg-neutral-100 px-4 py-4 rounded-full">
              <Text className="font-JakartaSemiBold text-base flex-1">{user?.lastName || "JS Mastery"}</Text>
              <Ionicons name="create-outline" size={24} color="#333" />
            </View>
          </View>

          {/* Email */}
          <View className="mb-5">
            <Text className="text-gray-500 font-JakartaMedium mb-2 text-base">Email</Text>
            <View className="flex flex-row items-center justify-between bg-neutral-100 px-4 py-4 rounded-full">
              <Text className="font-JakartaSemiBold text-base flex-1">{user?.emailAddresses[0].emailAddress || "marin@jsmastery.pro"}</Text>
              <Ionicons name="create-outline" size={24} color="#333" />
            </View>
          </View>

          {/* Email status */}
          <View className="mb-5">
            <Text className="text-gray-500 font-JakartaMedium mb-2 text-base">Email status</Text>
            <View className="flex flex-row items-center justify-start bg-neutral-100 px-4 py-4 rounded-full">
              <View className="flex flex-row items-center bg-white border-[0.5px] border-[#0CC25F] px-3 py-1 rounded-full">
                <Ionicons name="checkmark" size={16} color="#0CC25F" />
                <Text className="font-JakartaMedium text-sm ml-1 text-black">Verified</Text>
              </View>
            </View>
          </View>

          {/* Phone number */}
          <View className="mb-5">
            <Text className="text-gray-500 font-JakartaMedium mb-2 text-base">Phone number</Text>
            <View className="flex flex-row items-center justify-between bg-neutral-100 px-4 py-4 rounded-full">
              <Text className="font-JakartaSemiBold text-base flex-1">{user?.phoneNumbers?.[0]?.phoneNumber || "+5547824162"}</Text>
              <Ionicons name="create-outline" size={24} color="#333" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
