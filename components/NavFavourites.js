import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Sanghar, Pakistan",
  },
  {
    id: "456",
    icon: "book",
    location: "Muet",
    destination: "Jamshoro, Pakistan",
  },
];
const NavFavourites = () => {
  return (
    <View style={tw`bg-gray-200 p-4 rounded-lg`}>
      <Text style={tw`font-bold text-lg text-center`}>Following Features are coming Soon</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`flex-row items-center p-1 m-1 rounded-full bg-gray-100`}
          >
            <Icon
              style={tw`m-1 mr-4 bg-gray-300 rounded-full  p-1 `}
              name={item.icon}
              color="black"
              type="antdesign"
              size={16}
            />
            <View>
              <Text style={tw`font-bold text-base`}>Coming Soon</Text>
              <Text style={tw`text-gray-500`}>Coming Soon</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
