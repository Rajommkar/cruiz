import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useDriverStore, useLocationStore } from "@/store";
import Payment from "@/components/Payment";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  const driverDetails = drivers?.find(
    (driver) => Number(driver.id) === selectedDriver,
  );

  return (
    <RideLayout title="Choose a Rider" snapPoints={["75%", "85%"]}>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-JakartaSemiBold">Ride Information</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.close} className="w-5 h-5" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-col w-full items-center justify-center mt-6">
        <Image
          source={{ uri: driverDetails?.profile_image_url }}
          className="w-24 h-24 rounded-full"
        />
        <View className="flex flex-row items-center justify-center mt-4">
          <Text className="text-xl font-JakartaBold">
            {driverDetails?.title}
          </Text>
          <View className="flex flex-row items-center ml-2 space-x-1">
            <Image
              source={icons.star}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-lg font-JakartaRegular">
              {driverDetails?.rating}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex flex-col w-full items-start justify-center py-4 px-5 rounded-3xl bg-[#E8F1FC] mt-5">
        <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
          <Text className="text-lg font-JakartaRegular">Ride Price</Text>
          <Text className="text-lg font-JakartaBold text-[#0CC25F]">
            ${driverDetails?.price}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
          <Text className="text-lg font-JakartaRegular">Pickup time</Text>
          <Text className="text-lg font-JakartaRegular">
            {driverDetails?.time} Min
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between w-full py-3">
          <Text className="text-lg font-JakartaRegular">Car Seats</Text>
          <Text className="text-lg font-JakartaRegular">
            {driverDetails?.car_seats}
          </Text>
        </View>
      </View>

      <View className="flex flex-col w-full items-start justify-center mt-5 mb-5">
        <View className="flex flex-row items-center justify-start border-b border-gray-100 w-full py-3">
          <Image source={icons.to} className="w-6 h-6" />
          <Text className="text-lg font-JakartaRegular ml-2">
            {userAddress}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-start w-full py-3">
          <Image source={icons.point} className="w-6 h-6" />
          <Text className="text-lg font-JakartaRegular ml-2">
            {destinationAddress}
          </Text>
        </View>
      </View>

      <Payment
        fullName={user?.fullName!}
        email={user?.emailAddresses[0].emailAddress!}
        amount={driverDetails?.price?.toString()!}
        driverId={driverDetails?.id!}
        rideTime={driverDetails?.time!}
      />
    </RideLayout>
  );
};

export default BookRide;
