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
  // var feedObj = {
  //   'TrainingCenterDatabase':{
  //     '@xmlns': 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2',
  //     '@xmlns:xsi':'http://www.w3.org/2001/XMLSchema-instance',
  //     '@xmlns:schemaLocation':'http://www.garmin.com/xmlschemas/ActivityExtension/v2 http://www.garmin.com/xmlschemas/ActivityExtensionv2.xsd http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd',
  //     'Activities':{
  //       'Activity':{ '@Sport':'Biking',
  //       'Id':'2010-06-26T10:06:11Z',
  //       'Lap':{'@StartTime':'2010-06-26T10:06:11Z',
  //         'TotalTimeSeconds':'906.1800000',
  //         'DistanceMeters':'9762.4433594',
  //         'MaximumSpeed':'15.2404995',
  //         'Calories':'493',
  //         'AverageHeartRateBpm':{'@xsi:type':'HeartRateInBeatsPerMinute_t',
  //             'Value':'179'
  //             },
  //         'MaximumHeartRateBpm':{'@xsi:type':'HeartRateInBeatsPerMinute_t',
  //             'Value':'194'
  //           },
  //         'Intensity':'Active',
  //         'Cadence':'84',
  //         'TriggerMethod':'Location',
  //         'Track':{
  //             'Trackpoint':{
  //               'Time':'2010-06-26T10:06:11Z',
  //               'Position':{
  //                 'LatitudeDegrees':'40.7780135',
  //                 'LongitudeDegrees':'-73.9665795'
  //               },
  //               'AltitudeMeters':'36.1867676',
  //               'DistanceMeters':'0.0629519',
  //               'HeartRateBpm':{'@xsi:type':'HeartRateInBeatsPerMinute_t',
  //                 'Value':'148'
  //               },
  //               'SensorState':'Absent',
  //             },
  //             'Trackpoint': {
  //               'Time': '2010-06-2T10:06:11Z',
  //               'Position': {
  //                 'LatitudeDegrees': '40.7780135',
  //                 'LongitudeDegrees': '-73.9665795'
  //               },
  //               'AltitudeMeters': '36.1867676',
  //               'DistanceMeters': '0.0629519',
  //               'HeartRateBpm': {
  //                 '@xsi:type': 'HeartRateInBeatsPerMinute_t',
  //                 'Value': '200'
  //               },
  //               'SensorState': 'Absent',
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  // };

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


  // var feed = builder.create('feed', { encoding: 'utf-8' })
  // .att('xmlns', 'http://www.w3.org/2005/Atom')
  // .ele('title', { 'type': 'text'}, 'dive into mark').up()
  // .ele('subtitle', { 'type': 'html' }, 'A <em>lot</em> of effort went into making this effortless').up()
  // .ele('updated', '2005-07-31T12:29:29Z').up()
  // .ele('id', 'tag:example.org,2003:3').up()
  // .ele('link', { 'rel': 'alternate', 'type': 'text/html', 'hreflang': 'en', 'href': 'http://example.org/' }).up()
  // .ele('link', { 'rel': 'self', 'type': 'application/atom+xml', 'href': 'http://example.org/feed.atom' }).up()
  // .ele('rights', 'Copyright (c) 2003, Mark Pilgrim').up()
  // .ele('generator', { 'uri': 'http://www.example.com/', 'version': '1.0' }, 'Example Toolkit').up()
  // .ele('entry')
  //   .ele('title', 'Atom draft-07 snapshot').up()
  //   .ele('link', { 'rel': 'alternate', 'type': 'text/html', 'href': 'http://example.org/2005/04/02/atom' }).up()
  //   .ele('link', { 'rel': 'enclosure', 'type': 'audio/mpeg', 'length': '1337', 'href': 'http://example.org/audio/ph34r_my_podcast.mp3' }).up()
  //   .ele('id', 'tag:example.org,2003:3.2397').up()
  //   .ele('updated', '2005-07-31T12:29:29Z').up()
  //   .ele('published', '2003-12-13T08:29:29-04:00').up()
  //   .ele('author')
  //     .ele('name', 'Mark Pilgrim').up()
  //     .ele('uri', 'http://example.org/').up()
  //     .ele('email', 'f8dy@example.com').up()
  //   .up()
  //   .ele('contributor')
  //     .ele('name', 'Sam Ruby').up()
  //   .up()
  //   .ele('contributor')
  //     .ele('name', 'Joe Gregorio').up()
  //   .up()
  //   .ele('content', { 'type': 'xhtml', 'xml:lang': 'en', 'xml:base': 'http://diveintomark.org/' })
  //     .ele('div', { 'xmlns': 'http://www.w3.org/1999/xhtml' })
  //       .ele('p')
  //         .ele('i', '[Update: The Atom draft is finished.]').up()
  //       .up()
  //     .up()
  //   .up()
  // .up()

  xmlbuilder.begin(function(chunk) { process.stdout.write(chunk); })
  .dec()
  .ele('root')
    .ele('xmlbuilder').up()
  .end();


  // var feed = builder.create(feedObj, { encoding: 'utf-8' }, { standalone: false })
  // console.log(feed.end({ pretty: true }));



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