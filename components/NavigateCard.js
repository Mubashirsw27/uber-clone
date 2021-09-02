import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAPS_APIKEY } from "../config";
import { useDispatch, useSelector } from "react-redux";

import {
  selectDestination,
  setDestination,
  setOrigin,
} from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements/dist/icons/Icon";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  const [checkHandle, setCheckHandle] = useState(false);
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center mb-5 pt-0 text-lg`}>Good Morning Sir 😊</Text>

      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            styles={toInputBoxStyles}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            onChangeText={() => setCheckHandle(false)}
          />
        </View>
        {/* <View>{!destination && checkHandle && <NavFavourites />}</View> */}
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tw`flex flex-row bg-black justify-between w-24 rounded-full m-2 py-3 px-4 ${
            !destination && `bg-gray-400`
          }`}
          onPress={() => navigation.navigate("RideOptionsCard")}
          disabled={!destination}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-center text-white `}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row bg-white w-24 rounded-full justify-between m-2 py-3 px-4 border border-gray-200`}
          onPress={() => navigation.navigate("EatScreen")}
        >
          <Icon name="car" type="font-awesome" color="black" size={16} />
          <Text style={tw`text-center text-black`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 8,
    position: "relative",
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 10,
    fontSize: 12,
  },
  textInputContainer: {
    paddingHorizontal: 6,
    paddingBottom: 0,
  },
});
