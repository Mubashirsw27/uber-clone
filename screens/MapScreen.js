import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

const MapScreen = () => {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  return (
    <View>
      <View style={tw`h-1/4`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute top-8 left-5 z-50 rounded-full border border-gray-200 bg-white`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Map />
      </View>
      <View style={tw`h-full`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
