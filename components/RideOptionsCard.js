import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectTravelTimeInformation } from "../slices/navSlice";
import "intl";

import "intl/locale-data/jsonp/en";

const data = [
  {
    id: 1,
    name: "RickShaw",
    multiplier: 0.5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBDAjAXcIAoP5mHfS2CFHhe0YghHrHAu-SEQ&usqp=CAU",
  },
  {
    id: 2,
    name: "Bike",
    speed: 2,
    multiplier: 3,
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: 3,
    name: "UberX",
    speed: 3,
    multiplier: 7,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png",
  },
  {
    id: 4,
    name: "UberXL",
    speed: 3.5,
    multiplier: 8.5,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png",
  },
  {
    id: 5,
    name: "UberLux",
    speed: 3.8,
    multiplier: 9,
    image:
      "data:image/jpeg;base64,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",
  },
];

function convertHMS(value, id) {
  value = value / id;
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + " h " + minutes + " mins+";
}

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-2 left-5 z-50 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        {travelTimeInformation && (
          <Text style={tw`text-center text-xl py-1`}>
            Select a Ride - {travelTimeInformation?.distance?.text}
          </Text>
        )}
        {!travelTimeInformation && (
          <Text style={tw`text-center text-xl py-1`}>Select a Ride</Text>
        )}
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: { name, id, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-4 py-0 h-20 ${
              id === selected?.id && `bg-gray-200 rounded-lg`
            }`}
          >
            <Image
              style={{
                width: 70,
                height: 70,

                borderRadius: 40,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            {item.id <= 2 &&
            travelTimeInformation?.distance?.value >= 200000 ? (
              <>
                <View style={tw`-ml-2`}>
                  <Text style={tw`text-sm font-bold`}>{item.name}</Text>
                  <Text>N/A for more than 200km</Text>
                </View>
                <Text style={tw`text-sm`}>N/A</Text>
              </>
            ) : (
              <>
                <View style={tw`-ml-2`}>
                  <Text style={tw`text-sm font-bold`}>{item.name}</Text>
                  <Text>
                    {convertHMS(
                      travelTimeInformation?.duration?.value,
                      item?.id
                    )}
                  </Text>
                </View>
                <Text style={tw`text-sm`}>
                  {new Intl.NumberFormat("en-US", {
                    currency: "Rup",
                  }).format(
                    (travelTimeInformation?.duration?.value *
                      SURGE_CHARGE_RATE *
                      multiplier) /
                      20
                  )}{" "}
                  Rs
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`bg-black py-2 m-1 rounded-xl ${!selected && `bg-gray-500`}`}
          disabled={!selected}
        >
          <Text style={tw`text-white text-center text-lg `}>
            Choose {selected?.name}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
