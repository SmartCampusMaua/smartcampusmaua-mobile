import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../HomeScreen";
import { MapScreen } from "../MapScreen";
import { CameraExampleScreen } from "../CameraScreen";




type MainTabParamList = {
  Home: undefined;
  Map: undefined;
  Camera: undefined;
  Profile: undefined;
  CameraExample: undefined;
};


// Init React Navigation
const MainStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator<MainTabParamList>();


type position = {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  mocked: boolean;
  provider: string;
  timestamp: number;
}


// MainScreen COmponent
export const MainScreen = () => {

  // getGeolocationService since the MainScreen and Props to Children
  // const [hasLocationPermission, setHasLocationPermission] = useState(true)
  // const [position, setPosition] = useState<position>({
  //   coords: {
  //     accuracy: 0,
  //     altitude: 0,
  //     altitudeAccuracy: 0,
  //     heading: 0,
  //     latitude: 0,
  //     longitude: 0,
  //     speed: 0,
  //   },
  //   mocked: false,
  //   provider: '',
  //   timestamp: 0
  // })
  
  // if (hasLocationPermission) {
  // Geolocation.getCurrentPosition(
  //     (position: any) => {
  //       console.log(position);
  //       setPosition(position)
  //     },
  //     (error) => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // }

    

  return (
    <MainTab.Navigator screenOptions={{ headerShown: false }}>
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Map" component={MapScreen} />
      <MainTab.Screen name="CameraExample" component={CameraExampleScreen} />
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