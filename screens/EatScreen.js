import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";

const EatScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          style={tw`p-2 bg-gray-800 rounded-full w-20 mt-10 mx-auto `}
          name="arrowleft"
          color="white"
          type="antdesign"
        />
      </TouchableOpacity>
      <View style={tw`h-40 mx-auto py-60`}>
        <Text style={tw`font-bold text-lg`}>Coming Soon</Text>
      </View>
    </SafeAreaView>
  );
};

export default EatScreen;

const styles = StyleSheet.create({
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
