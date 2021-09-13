import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux files/store";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./screens/MapScreen";
import EatScreen from "./screens/EatScreen";
import LoginScreen from "./screens/LoginScreen";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "./components/context";
import { selectUserToken } from "./slices/navSlice";
const Stack = createNativeStackNavigator();
export default function App() {
  //  const dispatch = useDispatch(function);
  // const userTokenFromRedux = useSelector(selectUserToken);

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken(userToken);
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken(userToken);
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <SafeAreaProvider>
              <Stack.Navigator>
                {!(userToken === null) ? (
                  <>
                    {console.log(userToken)}
                    <Stack.Screen
                      name="HomeScreen"
                      component={HomeScreen}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="MapScreen"
                      component={MapScreen}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="EatScreen"
                      component={EatScreen}
                      options={{
                        headerShown: false,
                      }}
                    />
                  </>
                ) : (
                  <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                )}
              </Stack.Navigator>
            </SafeAreaProvider>
          </KeyboardAvoidingView>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}
