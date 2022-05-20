import React, { useState, useEffect } from 'react';

import {
  Alert,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  LogBox
} from 'react-native';

// Warning:
// `new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.
// Seems to be a bug caused by libraries that aren't optmised for the latest version of react-native 
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message


import Geolocation from '@react-native-community/geolocation'; //Import of Geolocation

import axios from 'axios'; //Import of http library

import { enableLatestRenderer } from 'react-native-maps'; //Import for the latest Google Maps map
enableLatestRenderer();
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; //remove PROVIDER_GOOGLE import if not using Google Maps

//Phone Sensors
import {
  accelerometer,
  gyroscope,
  magnetometer,
  barometer,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";


const baseURL = 'https://smartcampus.maua.br/node/gpslocation'; //dash SmartCampus

export const MapScreen = () => {
  //Map Variables
  const [region, setRegion] = useState(null);

  //GPS Variables 
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentAltitude, setCurrentAltitude] = useState('');
  const [watchID, setWatchID] = useState(0); //GPS tracking ID, needed for tracking it's callbacks, states and to end it

  //GPS Permissions for both OS's
  const callLocation = () => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permit Location Access",
            message: "The App needs to access your location.",
            buttonNeutral: "Ask me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          Alert.alert('Location Permition Denied');
        }
      };
      requestLocationPermission()
    }
  }

  //Function to obtain location
  async function getLocation() {
    await Geolocation.getCurrentPosition(
      (position) => { //Sucess callback function
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentAltitude = JSON.stringify(position.coords.altitude);
        // console.log(currentLatitude);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
        setCurrentAltitude(currentAltitude);
      },
      (error) => Alert.alert(error.message), //Error callback function
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    const watchID = Geolocation.watchPosition((position) => {
      const currentLatitude = JSON.stringify(position.coords.latitude);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      const currentAltitude = JSON.stringify(position.coords.altitude);
      setCurrentLatitude(currentLatitude);
      setCurrentLongitude(currentLongitude);
      setCurrentAltitude(currentAltitude);
    });
    setWatchID(watchID);
  }

  //Function do end GPS tracking 
  const clearLocation = () => {
    Geolocation.clearWatch(watchID);
  }

  //Axios HTTP 
  const [post, setPost] = React.useState(null);

  function createPost() {
    axios.post(baseURL, {
      lat: currentLatitude,
      lon: currentLongitude,
      alt: currentAltitude,
    }).then((response) => {
      setPost(response.data);
    }).catch(error => console.log(error));
  }

  const sendLocation = () => {
    callLocation();
    // console.log(currentLatitude);
    createPost(); //will send first a blank Location, then always the previous obtained Location
  }

  //Function that sends location every 10s
  useEffect(() => {
    const interval10s = setInterval(() => {
      sendLocation();
    }, 10000);
    return () => clearInterval(interval10s);
  }, [currentLatitude, currentLongitude, currentAltitude]);



  //Phone sensors
  var [accelValue, setAccelValue] = useState({ x:0, y:0, z:0 });
  var [gyroValue, setGyroValue] = useState({ x:0, y:0, z:0 });
  var [magValue, setMagValue] = useState({ x:0, y:0, z:0 });
  var [pressureValue, setPressureValue] = useState(0);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // defaults to 100ms
    setUpdateIntervalForType(SensorTypes.gyroscope, 1000); // defaults to 100ms
    // setUpdateIntervalForType(SensorTypes.magnetometer, 1000); // defaults to 100ms
    // setUpdateIntervalForType(SensorTypes.barometer, 1000); // defaults to 100ms
    
    const accelSubscription = accelerometer.subscribe(({ x, y, z }) =>{
      console.log({ x, y, z });
      setAccelValue({ x, y, z });
      console.log(accelValue.x);
    });
    const gyroSubscription = gyroscope.subscribe(({ x, y, z }) => {
      console.log({ x, y, z });
      setGyroValue({ x, y, z });
    });
    // const magSubscription = magnetometer.subscribe(({ x, y, z }) =>{
    //   console.log({ x, y, z })
    //   magValue = { x, y, z };
    // });
    // const barSubscription = barometer.subscribe(({ pressure }) =>{
    //   console.log({ pressure })
    //   pressureValue = pressure;
    // });

    return () => {
      accelSubscription.unsubscribe();
      gyroSubscription.unsubscribe();
      // magSubscription.unsubscribe();
      // barSubscription.unsubscribe();
    }
  }, [accelValue, gyroValue, magValue, pressureValue]);


  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
      >
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={{
              latitude: -23.598,
              longitude: -46.6473,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
            zoomEnabled={true}
            showsUserLocation={true}
            loadingEnabled={true}
          >
          </MapView>
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>
            Latitude: {currentLatitude}
          </Text>
          <Text style={styles.text}>
            Longitude: {currentLongitude}
          </Text>
          <Text style={styles.text}>
            Altitude: {currentAltitude}
          </Text>
          <View style={styles.button}>
            <Button title="Get Location" onPress={callLocation} />
          </View>
          <View style={styles.button}>
            <Button title="Stop Tracking" onPress={clearLocation} />
          </View>
          <View style={styles.button}>
            <Button title="POST" onPress={createPost} />
          </View>
          <View style={styles.button}>
            <Button title="Send Location" onPress={sendLocation} />
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>
              Gyro x: {gyroValue.x} Gyro y: {gyroValue.y} Gyro z: {gyroValue.z}
            </Text>
            <Text style={styles.text}>
            Accel x: {accelValue.x} Accel y: {accelValue.y} Accel z: {accelValue.z}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
    marginRight: 20,
    marginLeft: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    flex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


