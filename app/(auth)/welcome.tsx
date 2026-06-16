import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView
      className="bg-white"
      style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}
    >
      {/* Skip button — pinned top-right */}
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        style={{ width: "100%", alignItems: "flex-end", padding: 20 }}
      >
        <Text className="text-black text-base font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
        style={{ flex: 1 }}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Image
              source={item.image}
              style={{ width: "100%", height: 300 }}
              resizeMode="contain"
            />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              <Text
                style={{ textAlign: "center", marginHorizontal: 40 }}
                className="text-black text-3xl font-bold"
              >
                {item.title}
              </Text>
            </View>
            <Text
              style={{
                textAlign: "center",
                marginHorizontal: 40,
                marginTop: 12,
              }}
              className="text-lg font-JakartaSemiBold text-[#858585]"
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Next / Get Started button */}
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollTo(activeIndex + 1)
        }
        className="w-11/12 mt-10 mb-5"
      />
    </SafeAreaView>
  );
};

export default Welcome;
