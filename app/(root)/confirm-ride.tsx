import { FlatList, View, ActivityIndicator, Text } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import { useDriverStore, useLocationStore } from "@/store";
import { calculateDriverTimes } from "@/lib/map";
import { MarkerData } from "@/types/type";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver, setDrivers } =
    useDriverStore();
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDriverTimes = async () => {
      if (!drivers || drivers.length === 0) return;
      if (
        !userLatitude ||
        !userLongitude ||
        !destinationLatitude ||
        !destinationLongitude
      )
        return;

      setLoading(true);
      const updatedDrivers = await calculateDriverTimes({
        markers: drivers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      });
      if (updatedDrivers) {
        setDrivers(updatedDrivers as MarkerData[]);
      }
      setLoading(false);
    };

    fetchDriverTimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

  return (
    <RideLayout title="Choose a Rider" snapPoints={["65%", "85%"]}>
      {loading ? (
        <View className="flex-1 items-center justify-center py-10">
          <ActivityIndicator size="large" color="#0286FF" />
          <Text className="text-sm font-JakartaMedium text-gray-500 mt-3">
            Finding nearby riders...
          </Text>
        </View>
      ) : (
        <FlatList
          data={drivers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DriverCard
              item={item}
              selected={selectedDriver!}
              setSelected={() => setSelectedDriver(Number(item.id!))}
            />
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center py-10">
              <Text className="text-sm font-JakartaMedium text-gray-500">
                No drivers available nearby
              </Text>
            </View>
          )}
          ListFooterComponent={() => (
            <View className="mx-5 mt-10">
              <CustomButton
                title="Select Ride"
                onPress={() => router.push("/(root)/book-ride")}
              />
            </View>
          )}
        />
      )}
    </RideLayout>
  );
};

export default ConfirmRide;
