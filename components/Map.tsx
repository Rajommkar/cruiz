import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterests={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
      initialRegion={{
        latitude: 27.717245,
        longitude: 85.323961,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
    </MapView>
  );
};

export default Map;
