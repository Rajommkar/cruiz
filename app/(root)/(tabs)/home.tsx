
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser, useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import { router } from "expo-router";

import RideCard from "@/components/RideCard";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { data: recentRides, loading } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  const { setUserLocation, setDestinationLocation } = useLocationStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }
      setHasPermissions(true);

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0]?.name || "Unknown"}, ${address[0]?.region || "Unknown"}`,
      });
    };

    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };

  return (
    <SafeAreaView className="bg-general-500" style={{ flex: 1 }}>
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 20,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm font-JakartaMedium text-gray-500 mt-2">
                  No recent rides found
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#0286FF" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            {/* Header Row */}
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold capitalize">
                Welcome{" "}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
                👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            {/* Map section */}
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            {/* Recent rides label */}
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
