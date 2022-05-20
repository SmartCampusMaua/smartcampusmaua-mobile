import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Alert, Linking, PermissionsAndroid, ToastAndroid, Platform } from 'react-native';
import RNMapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';



export const MapView = ({ coords }: any) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!!coords && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      });
    }
  }, [coords]);


  return (
    <View style={styles.container}>
    <RNMapView
      ref={mapRef}
      initialCamera={{
        altitude: 15000,
        center: {
          latitude: 23.7603,
          longitude: 90.4125,
        },
        heading: 0,
        pitch: 0,
        zoom: 11,
      }}
      loadingEnabled
      loadingBackgroundColor="white"
      style={StyleSheet.absoluteFillObject}
      rotateEnabled={false}
    >
      {!!coords && (
        <>
          <Marker
            anchor={{ x: 0.5, y: 0.6 }}
            coordinate={{
              latitude: coords.latitude,
              longitude: coords.longitude,
            }}
            flat
            style={{
              ...(coords.heading !== -1 && {
                transform: [
                  {
                    rotate: `${coords.heading}deg`,
                  },
                ],
              }),
            }}
          >
            <View style={styles.dotContainer}>
              <View style={[styles.arrow]} />
              <View style={styles.dot} />
            </View>
          </Marker>
          <Circle
            center={{
              latitude: coords.latitude,
              longitude: coords.longitude,
            }}
            radius={coords.accuracy}
            strokeColor="rgba(0, 150, 255, 0.5)"
            fillColor="rgba(0, 150, 255, 0.5)"
          />
        </>
      )}
    </RNMapView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgb(0, 120, 255)',
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 4,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgb(0, 120, 255)',
  },

});