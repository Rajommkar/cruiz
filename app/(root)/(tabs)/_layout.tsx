import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
}: {
  source: any;
  focused: boolean;
}) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    }}
  >
    <View
      style={{
        borderRadius: 50,
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? "#0CC25F" : "transparent",
      }}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        style={{ width: 26, height: 26 }}
      />
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
