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



const baseURL = 'http://192.168.68.123:1880/gpslocation'; //debugCB
// const baseURL = 'https://smartcampus.maua.br/node/gpslocation'; //dash SmartCampus

export const LocationScreen = () => {
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
  const getLocation = () => {
    Geolocation.getCurrentPosition(
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

  if(!post){
    console.log('No post!');
  }

  const sendLocation = () =>{
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



  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
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
              <Button title="POST" onPress={createPost}/>
          </View>
          <View style={styles.button}>
              <Button title="Send Location" onPress={sendLocation}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
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
    flex: 1
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});