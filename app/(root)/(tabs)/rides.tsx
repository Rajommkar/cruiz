import { FlatList, Text, View, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import RideCard from "@/components/RideCard";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";
import { icons, images } from "@/constants";

const Rides = () => {
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center mt-20">
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
          <View className="flex flex-row items-center justify-between my-5">
            <Text className="text-2xl font-JakartaExtraBold">Popular Car</Text>
            <View className="flex flex-row items-center justify-center">
              <Text className="text-base font-JakartaMedium text-[#0286FF] mr-1">
                Ascending
              </Text>
              <Image source={icons.arrowDown} className="w-4 h-4" tintColor="#0286FF" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Rides;
