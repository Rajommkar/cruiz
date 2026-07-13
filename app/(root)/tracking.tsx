import { Image, Text, View } from "react-native";
import { router } from "expo-router";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useDriverStore, useLocationStore } from "@/store";
import CustomButton from "@/components/CustomButton";

const Tracking = () => {
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  const driverDetails = drivers?.find(
    (driver) => Number(driver.id) === selectedDriver,
  );

  return (
    <RideLayout title="Choose a Rider" snapPoints={["65%", "85%"]}>
      <View className="flex flex-col w-full items-start justify-center py-5">
        <Text className="text-xl font-JakartaSemiBold">
          Arriving in <Text className="text-[#0CC25F]">{driverDetails?.time} Mins</Text>
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between w-full py-5 px-5 rounded-3xl bg-[#E8F1FC] mt-2">
        <View className="flex flex-col items-center justify-center">
          <Image
            source={{ uri: driverDetails?.profile_image_url }}
            className="w-20 h-20 rounded-full"
          />
          <Text className="text-lg font-JakartaMedium mt-2">
            {driverDetails?.title}
          </Text>
        </View>
        <Image
          source={{ uri: driverDetails?.car_image_url }}
          className="w-32 h-20"
          resizeMode="contain"
        />
      </View>

      <View className="flex flex-col w-full items-start justify-center mt-5 mb-5">
        <View className="flex flex-row items-center justify-start border-b border-gray-100 w-full py-4">
          <Image source={icons.to} className="w-6 h-6" />
          <Text className="text-lg font-JakartaRegular ml-2">
            {userAddress}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-start w-full py-4">
          <Image source={icons.point} className="w-6 h-6" />
          <Text className="text-lg font-JakartaRegular ml-2">
            {destinationAddress}
          </Text>
        </View>
      </View>

      <CustomButton
        title="Back Home"
        onPress={() => router.push("/(root)/(tabs)/home")}
        className="mt-5"
      />
    </RideLayout>
  );
};

export default Tracking;
