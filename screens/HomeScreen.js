import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "../config";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Images/Logo.png";
import { selectOrigin, setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-8`}>
        <Image style={tw`w-20 h-20 mx-auto my-2`} source={Logo} alt="Uber" />

        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <GooglePlacesAutocomplete
            styles={toInputBoxStyles}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              dispatch(setDestination(null));
            }}
            fetchDetails={true}
            placeholder="Select From Where?"
            onFail={(error) => alert(error)}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>
        {origin && <NavOptions style={styles} />}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
  },
});

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
