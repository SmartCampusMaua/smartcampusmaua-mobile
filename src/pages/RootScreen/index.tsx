import React from "react";
import { View, Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../HomeScreen";
import { LocationScreen } from "../LocationScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const RootScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Location" component={LocationScreen} />
      <Tab.Screen name="Documentation" component={DocumentationScreen} />
    </Tab.Navigator>
  );
}

export const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}
  
export const QRCodeScreen = () => {
  return (
    <View>
      <Text>QRCode</Text>
    </View>
  )
}
  
type HomeScreenProps = {
  navigation: any;
}
  


export const DocumentationScreen = () => {
    return (
        <View>
        <Text>Documentation</Text>
        </View>
    )
}
  