import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a Ride",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order Food",
    image:
      "https://iconarchive.com/download/i99096/icons-land/3d-food/FastFood-FrenchFries.ico",
    screen: "EatScreen", //Changes will be done in Future
  },
];

const NavOptions = () => {
  const navigation = useNavigation("");
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
     
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-1  pl-4 pr-1 pb-6 bg-gray-300  m-4 w-28 rounded`}
         
        >
          <View style={tw`${!origin && "opacity-20"}`}>
            <Image
              style={{
                width: 85,
                height: 85,
                resizeMode: "contain",
              }}
              source={{
                uri: item.image,
              }}
            />

            <Text style={tw`mt-2 text-base font-normal`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-11 mt-2 mx-auto relative`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
      style={tw`z-10`}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({});
