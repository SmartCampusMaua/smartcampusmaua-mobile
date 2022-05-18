import React from "react";
import { View, Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../HomeScreen";
import { MapScreen } from "../MapScreen";
import { BasicCameraScreen } from "../CameraScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const MainScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Camera" component={BasicCameraScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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

