import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants";
import { MarkerData } from "@/types/type";

interface DriverCardProps {
  item: MarkerData;
  selected: number;
  setSelected: () => void;
}

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      className={`flex flex-row items-center justify-between py-5 px-3 rounded-xl ${selected === item.id ? "bg-general-600" : "bg-white"}`}
    >
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: item.profile_image_url }}
          className="w-14 h-14 rounded-full"
        />

        <View className="flex flex-col items-start justify-center ml-3">
          <View className="flex flex-row items-center mb-1">
            <Text className="text-lg font-JakartaRegular">{item.title}</Text>

            <View className="flex flex-row items-center space-x-1 ml-2">
              <Image source={icons.star} className="w-3.5 h-3.5" />
              <Text className="text-sm font-JakartaRegular">{item.rating}</Text>
            </View>
          </View>

          <View className="flex flex-row items-center">
            <View className="flex flex-row items-center">
              <Image source={icons.dollar} className="w-4 h-4" />
              <Text className="text-sm font-JakartaRegular ml-1">
                ${item.price}
              </Text>
            </View>

            <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
              |
            </Text>

            <Text className="text-sm font-JakartaRegular text-general-800">
              {item.time}
            </Text>

            <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
              |
            </Text>

            <Text className="text-sm font-JakartaRegular text-general-800">
              {item.car_seats} seats
            </Text>
          </View>
        </View>
      </View>

      <Image
        source={{ uri: item.car_image_url }}
        className="h-14 w-14"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default DriverCard;
