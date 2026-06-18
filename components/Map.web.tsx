import { View } from "react-native";

const Map = () => {
  return (
    <View className="flex-1 w-full h-full rounded-2xl overflow-hidden">
      <iframe
        src="https://maps.google.com/maps?q=27.717245,85.323961&t=&z=14&ie=UTF8&iwloc=&output=embed"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Interactive Web Map"
      />
    </View>
  );
};

export default Map;
