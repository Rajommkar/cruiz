import { useState } from "react";
import { View, Image, Text } from "react-native";
// import { useStripe } from "@stripe/stripe-react-native";
// import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import ReactNativeModal from "react-native-modal";

import CustomButton from "@/components/CustomButton";
// import { fetchAPI } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";
// import { useLocationStore } from "@/store";
import { images } from "@/constants";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);
  // const { user } = useUser();
  // const {
  //   userAddress,
  //   userLongitude,
  //   userLatitude,
  //   destinationLatitude,
  //   destinationAddress,
  //   destinationLongitude,
  // } = useLocationStore();

  // const confirmHandler = async (
  //   paymentMethod: any,
  //   _: any,
  //   intentCreationCallback: any
  // ) => {
  //   try {
  //     const request = await fetchAPI("/(api)/(stripe)/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: fullName || email.split("@")[0],
  //         email: email,
  //         amount: amount,
  //         paymentMethodId: paymentMethod.id,
  //       }),
  //     });

  //     if (request.paymentIntent) {
  //       const result = await fetchAPI("/(api)/(stripe)/pay", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           payment_method_id: paymentMethod.id,
  //           payment_intent_id: request.paymentIntent.id,
  //           customer_id: request.customer,
  //         }),
  //       });

  //       if (result.client_secret) {
  //         await fetchAPI("/(api)/ride/create", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             origin_address: userAddress,
  //             destination_address: destinationAddress,
  //             origin_latitude: userLatitude,
  //             origin_longitude: userLongitude,
  //             destination_latitude: destinationLatitude,
  //             destination_longitude: destinationLongitude,
  //             ride_time: rideTime,
  //             fare_price: parseInt(amount),
  //             payment_status: "paid",
  //             driver_id: driverId,
  //             user_id: user?.id,
  //           }),
  //         });

  //         intentCreationCallback({ clientSecret: result.client_secret });
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const initializePaymentSheet = async () => {
  //   // const { error } = await initPaymentSheet({
  //   //   merchantDisplayName: "Cruiz",
  //   //   intentConfiguration: {
  //   //     mode: {
  //   //       amount: parseInt(amount) * 100,
  //   //       currencyCode: "usd",
  //   //     },
  //   //     confirmHandler: confirmHandler,
  //   //   },
  //   //   returnURL: "myapp://book-ride",
  //   // });

  //   // if (error) {
  //   //   Alert.alert(`Error code: ${error.code}`, error.message);
  //   // }
  // };

  const openPaymentSheet = async () => {
    // await initializePaymentSheet();

    // const { error } = await presentPaymentSheet();

    // if (error) {
    //   Alert.alert(`Error code: ${error.code}`, error.message);
    // } else {
      setSuccess(true);
    // }
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />
          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>
          <Text className="text-md text-general-200 font-JakartaMedium text-center mt-3 mb-5">
            Thank you for your booking! Your reservation has been successfully placed. Please proceed with your trip.
          </Text>
          
          <CustomButton
            title="Go Track"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/tracking");
            }}
            style={{ marginTop: 20 }}
          />
          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            style={{ marginTop: 15, backgroundColor: '#F3F4F6', shadowOpacity: 0, elevation: 0 }}
            textVariant="primary"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
