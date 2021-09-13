import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Logo from "../Images/Logo.png";
import Muet from "../Images/Muet.jpg";
import { Icon, Text } from "react-native-elements";
import fbLogo from "../Images/fbLogo.png";
import twitterLogo from "../Images/twitterLogo.png";
import muetUber from "../Images/muetUber.png";
import googleLogo from "../Images/googleLogo.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../components/context";
import { useDispatch, useSelector } from "react-redux";
import { selectUserToken, setUserToken } from "../slices/navSlice";
const AppWrapper = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      {" "}
      // Set context
      <LoginScreen /> // Now App has access to context
    </Provider>
  );
};
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const { signIn } = React.useContext(AuthContext);
  const userToken = useSelector(selectUserToken);
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View>
        <ImageBackground source={Muet} style={tw`w-full h-full`}>
          <Image
            style={tw`w-28 h-28 mx-auto my-6 opacity-60`}
            source={Logo}
            alt="Uber"
          />
          <Image
            style={tw`w-72 h-10 mx-auto my-5 opacity-10`}
            source={muetUber}
            alt="Uber"
          />

          {/* <Text style={tw``}>MUET UBER</Text> */}

          <TextInput
            key={1}
            placeholder={"Enter email"}
            keyboardType="email-address"
            style={tw`bg-gray-200 w-80 h-12 rounded-lg my-2 mx-auto p-3`}
            onChange={(text) => setEmail(text.nativeEvent.text)}
          />
          <TextInput
            key={2}
            placeholder={"Enter your password"}
            secureTextEntry={true}
            style={tw`bg-gray-200 w-80 h-12 rounded-lg my-2 mx-auto p-3`}
            onChange={(text) => setPassword(text.nativeEvent.text)}
          />
          {/* <View style={tw`flex-row`}>
            <TextInput
              style={tw`bg-gray-200 w-80 h-12 rounded-lg my-2 mx-auto p-3 z-0`}
              autoCorrect={false}
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text.nativeEvent.text)}
            />
            <Icon
              name="eye"
              color="black"
              size={24}
              type="antdesign"
              style={tw`z-50`}
              
            />
          </View> */}
          <View style={tw`flex-row mx-auto my-10`}>
            <TouchableOpacity>
              <Image
                source={fbLogo}
                style={tw`w-16 h-16 mx-8 justify-evenly`}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={googleLogo}
                style={tw`w-14 h-14 mx-8 justify-evenly`}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={twitterLogo}
                style={tw`w-14 h-14 mx-8 justify-evenly bg-white rounded-full`}
              />
            </TouchableOpacity>
          </View>

          <View style={tw`w-28 my-4 mx-auto`}>
            <TouchableOpacity
              disabled={!email || !password}
              onPress={() => {
                dispatch(setUserToken(email));

                signIn();
              }}
              style={tw`bg-blue-400 rounded-lg text-lg font-bold mx-auto px-7 py-2 ${
                (!email || !password) && "bg-gray-400"
              }`}
            >
              <Text style={tw`text-base font-bold text-white`}>Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
