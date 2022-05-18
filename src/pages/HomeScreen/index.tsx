import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';


type Props = {};
type State = {};

export class HomeScreen extends Component<Props, State> {
  state = {};

  render() {
    return (
      <SafeAreaView style={styles.container}>
      {/* <SafeAreaView> */}

          <WebView
            source={{ uri: 'https://smartcampus.maua.br' }}
            nestedScrollEnabled={true}
          />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});