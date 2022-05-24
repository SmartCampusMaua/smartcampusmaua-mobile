import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Alert, Linking, PermissionsAndroid, ToastAndroid, Platform, ScrollView, Switch, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';

import appConfig from './app.json';

import { MapView } from '../../components/MapView'
import xmlbuilder from 'xmlbuilder';


export const MapScreen = () => {
  /////////////////////////////TESTES/////////////////////////////////////////////////////
  // XML Builder
  var builder = require('xmlbuilder');

  // File Creation
  var RNFS = require('react-native-fs');
  var path = RNFS.DocumentDirectoryPath + '/test.tcx';
  console.log(path);
  // write the file
  RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
  .then(() => {
    console.log('FILE WRITTEN!');
  })
  .catch(() => {
    console.log('FILE NOT WRITTEN');
  });
  

  // var newTrackpoint = {
  //   'Trackpoint': {
  //     'Time': '2010-06-2T10:06:11Z',
  //     'Position': {
  //       'LatitudeDegrees': '40.7780135',
  //       'LongitudeDegrees': '-73.9665795'
  //     },
  //     'AltitudeMeters': '36.1867676',
  //     'DistanceMeters': '0.0629519',
  //     'HeartRateBpm': {
  //       '@xsi:type': 'HeartRateInBeatsPerMinute_t',
  //       'Value': '100'
  //     },
  //     'SensorState': 'Absent',
  //   }
  // };

  // var newTrackpoint2 = {
  //   'Trackpoint': {
  //     'Time': '2010-06-2T10:06:11Z',
  //     'Position': {
  //       'LatitudeDegrees': '40.7780135',
  //       'LongitudeDegrees': '-73.9665795'
  //     },
  //     'AltitudeMeters': '36.1867676',
  //     'DistanceMeters': '0.0629519',
  //     'HeartRateBpm': {
  //       '@xsi:type': 'HeartRateInBeatsPerMinute_t',
  //       'Value': '200'
  //     },
  //     'SensorState': 'Absent',
  //   }
  // };

  // var trackpoints = {
  //   ...newTrackpoint,
  //   ...newTrackpoint2,
  // };

  // var feedObj = {
  //   'TrainingCenterDatabase': {
  //     '@xmlns': 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2',
  //     '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  //     '@xmlns:schemaLocation': 'http://www.garmin.com/xmlschemas/ActivityExtension/v2 http://www.garmin.com/xmlschemas/ActivityExtensionv2.xsd http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd',
  //     'Activities': {
  //       'Activity': {
  //         '@Sport': 'Biking',
  //         'Id': '2010-06-26T10:06:11Z',
  //         'Lap': {
  //           '@StartTime': '2010-06-26T10:06:11Z',
  //           'TotalTimeSeconds': '906.1800000',
  //           'DistanceMeters': '9762.4433594',
  //           'MaximumSpeed': '15.2404995',
  //           'Calories': '493',
  //           'AverageHeartRateBpm': {
  //             '@xsi:type': 'HeartRateInBeatsPerMinute_t',
  //             'Value': '179'
  //           },
  //           'MaximumHeartRateBpm': {
  //             '@xsi:type': 'HeartRateInBeatsPerMinute_t',
  //             'Value': '194'
  //           },
  //           'Intensity': 'Active',
  //           'Cadence': '84',
  //           'TriggerMethod': 'Location',
  //           'Track': {
  //             ...trackpoints
  //           }
  //         }
  //       }
  //     }
  //   }
  // };
  // var feed = builder.create(feedObj, { encoding: 'utf-8' }, { standalone: false })


  // TCX builder begining
  var feed = builder.create('TrainingCenterDatabase', { encoding: 'UTF-8' }, {standalone: false})
  .att('xmlns', 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2')
  .att('xmlns:xsi','http://www.w3.org/2001/XMLSchema-instance')
  .att('xmlns:schemaLocation','http://www.garmin.com/xmlschemas/ActivityExtension/v2 http://www.garmin.com/xmlschemas/ActivityExtensionv2.xsd http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd')
  .ele('Activites',)
    .ele('Activity', { 'Sport': 'Biking'})
      .ele('Id', '2010-06-26T10:06:11Z').up()
      .ele('Lap', { 'StartTime':'2010-06-26T10:06:11Z'})
        .ele('TotalTimeSeconds', '906.1800000').up()
        .ele('DistanceMeters', '9762.4433594').up()
        .ele('MaximumSpeed', '15.2404995').up()
        .ele('Calories', '493').up()
        .ele('AverageHeartRateBpm', {'xsi:type': 'HeartRateInBeatsPerMinute_t'})
          .ele('Value', '179').up()
        .up()
        .ele('MaximumHeartRateBpm', {'xsi:type': 'HeartRateInBeatsPerMinute_t'})
          .ele('Value', '194').up()
        .up()
        .ele('Intensity', 'Active').up()
        .ele('Cadence', '84').up()
        .ele('TriggerMethod', 'Location').up()
        .ele('Track')
          .ele('Trackpoint')
            .ele('Time', '2010-06-26T10:06:11Z').up()
            .ele('Position')
              .ele('LatitudeDegrees','40.7780135').up()
              .ele('LongitudeDegrees','-73.9665795').up()
            .up()
            .ele('AltitudeMeters', '36.1867676').up()
            .ele('DistanceMeters', '0.0629519').up()
            .ele('HeartRateBpm', { 'xsi:type':'HeartRateInBeatsPerMinute_t' })
              .ele('Value', '148').up()
            .up()
            .ele('SensorState', 'Absent').up()
          .up()
  //       .up()
  //     .up()
  //   .up()
  // .up()

  // TCX builder middle 
  feed.ele('Trackpoint')
    .ele('Time', '2010-06-26T10:06:11Z').up()
    .ele('Position')
      .ele('LatitudeDegrees','40.7780135').up()
      .ele('LongitudeDegrees','-73.9665795').up()
    .up()
    .ele('AltitudeMeters', '36.1867676').up()
    .ele('DistanceMeters', '0.0629519').up()
    .ele('HeartRateBpm', { 'xsi:type':'HeartRateInBeatsPerMinute_t' })
      .ele('Value', '148').up()
    .up()
    .ele('SensorState', 'Absent').up()
  .up()

  // TCX builder middle 2
  var testTime = '2022-22-22T22:22:22Z';
  var testLatitude = 20.7780135;
  var testLongitude = -10.7780135;
  var testAltitude = 30.1867676;
  var testDistance = 0.1000000;
  var testHeartRate = 200;
  var testSensorState = 'Absent';
  feed.ele('Trackpoint')
    .ele('Time', `${testTime}`).up()
    .ele('Position')
      .ele('LatitudeDegrees',`${testLatitude}`).up()
      .ele('LongitudeDegrees',`${testLongitude}`).up()
    .up()
    .ele('AltitudeMeters', `${testAltitude}`).up()
    .ele('DistanceMeters', `${testDistance}`).up()
    .ele('HeartRateBpm', { 'xsi:type':'HeartRateInBeatsPerMinute_t' })
      .ele('Value', `${testHeartRate}`).up()
    .up()
    .ele('SensorState', `${testSensorState}`).up()
  .up()

  // TCX builder end
  feed.up().up().up().up()

  console.log(feed.end({ pretty: true }));



  /////////////////////////////////TESTE///////////////////////////////

  // const [region, setRegion] = useState<Region>();
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState<any>(null);

  const watchId: any = useRef(null);

  // Has Permission on iOS
  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow GeoLoc to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => { } },
        ],
      );
    }

    return false;
  };

  // Has Permission
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  // Get location after permissions
  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position: any) => {
        setLocation(position);
        console.log(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  // update location after permissions
  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === 'android' && foregroundService) {
      await startForegroundService();
    }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      (position: any) => {
        setLocation(position);
        console.log(position);
      },
      (error) => {
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
        useSignificantChanges: significantChanges,
      },
    );
  };


  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.createNotificationChannel({
        id: 'locationChannel',
        name: 'Location Tracking Channel',
        description: 'Tracks location of user',
        enableVibration: false,
      });
    }

    return VIForegroundService.startService({
      channelId: 'locationChannel',
      id: 420,
      title: appConfig.displayName,
      text: 'Tracking location updates',
      icon: 'ic_launcher',
    });
  };

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch((err: any) => err);
  }, []);

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, [stopForegroundService]);


  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);



  return (
    <View style={styles.mainContainer}>
      <View style={styles.mapContainer}>
        <MapView
          coords={location?.coords || null}
        />
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <View style={styles.option}>
            <Text>Enable High Accuracy</Text>
            <Switch onValueChange={setHighAccuracy} value={highAccuracy} />
          </View>

          {Platform.OS === 'ios' && (
            <View style={styles.option}>
              <Text>Use Significant Changes</Text>
              <Switch
                onValueChange={setSignificantChanges}
                value={significantChanges}
              />
            </View>
          )}

          {Platform.OS === 'android' && (
            <>
              <View style={styles.option}>
                <Text>Show Location Dialog</Text>
                <Switch
                  onValueChange={setLocationDialog}
                  value={locationDialog}
                />
              </View>
              <View style={styles.option}>
                <Text>Force Location Request</Text>
                <Switch
                  onValueChange={setForceLocation}
                  value={forceLocation}
                />
              </View>
              <View style={styles.option}>
                <Text>Use Location Manager</Text>
                <Switch
                  onValueChange={setUseLocationManager}
                  value={useLocationManager}
                />
              </View>
              <View style={styles.option}>
                <Text>Enable Foreground Service</Text>
                <Switch
                  onValueChange={setForegroundService}
                  value={foregroundService}
                />
              </View>
            </>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Get Location" onPress={getLocation} />
          <View style={styles.buttons}>
            <Button
              title="Start Observing"
              onPress={getLocationUpdates}
              disabled={observing}
            />
            <Button
              title="Stop Observing"
              onPress={removeLocationUpdates}
              disabled={!observing}
            />
          </View>
        </View>

        <View style={styles.result}>
          <Text>Latitude: {location?.coords?.latitude || ''}</Text>
          <Text>Longitude: {location?.coords?.longitude || ''}</Text>
          <Text>Heading: {location?.coords?.heading}</Text>
          <Text>Accuracy: {location?.coords?.accuracy}</Text>
          <Text>Altitude: {location?.coords?.altitude}</Text>
          <Text>Altitude Accuracy: {location?.coords?.altitudeAccuracy}</Text>
          <Text>Speed: {location?.coords?.speed}</Text>
          <Text>Provider: {location?.provider || ''}</Text>
          <Text>
            Timestamp:{' '}
            {location?.timestamp
              ? new Date(location.timestamp).toLocaleString()
              : ''}
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollContainer: {
    flex: 0.5,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    padding: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  result: {
    borderWidth: 1,
    borderColor: '#777',
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
});