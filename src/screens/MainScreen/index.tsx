import React from "react";
import { View, Text } from "react-native";
import { MapScreen } from "../MapScreen";
import { CameraScreen } from "../CameraScreen";
import { HomeScreen } from "../HomeScreen";
import { MainTab } from '../../navigation/MainTabNavigator'

type MainTabParamList = {
  Home: undefined;
  Map: undefined;
  Camera: undefined;
  Profile: undefined;
  CameraExample: undefined;
};


export const MainScreen = () => {
  return (
    <MainTab.Navigator screenOptions={{ headerShown: false }}>
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Map" component={MapScreen} />
      <MainTab.Screen name="Camera" component={CameraScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
}

export const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}