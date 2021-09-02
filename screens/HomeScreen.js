import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "../config";
import { useDispatch, useSelector } from "react-redux";

import { selectOrigin, setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-8`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://media.designrush.com/inspirations/129137/conversions/_1521201517_957_UberLogoPreview-preview.jpg",
          }}
          alt="Uber"
        />

        <View style={tw`h-44 z-50`}>
          <GooglePlacesAutocomplete
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
            style={
              (tw`border-4 border-black border-solid`,
              {
                container: {
                  flex: 0,
                },
                textInput: {
                  fontSize: 18,
                },
              })
            }
          />
        </View>
        {origin && <NavOptions style={styles} />}
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
 container:{
   zIndex:0,
 }
});
