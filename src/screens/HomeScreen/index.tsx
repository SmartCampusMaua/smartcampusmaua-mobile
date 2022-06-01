import React, { Component, useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { HomeStack } from '../../navigation/HomeStackNavigator'

export const HomeScreen = () => {
  return (
    <HomeStack>
      <SafeAreaView style={styles.container}>
          <WebView
            source={{ uri: 'https://smartcampus.maua.br' }}
          />
      </SafeAreaView>
    </HomeStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});