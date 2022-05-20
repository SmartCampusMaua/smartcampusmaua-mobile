import React, { Component, useRef } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
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
          />
      </SafeAreaView>
    );
  }
}


// TODO: HomeScreen become a Functional COmponent and Backbutton in WebView
// export const HomeScreen = ({navigation}: any) => {
//   const ref = useRef(null);

//   return (
//     <SafeAreaView>
//     <WebView
//     ref={ref}
//     source={{ url: "https://smartcampus.maua.br" }}
//     startInLoadingState
//     renderLoading={() => (
//       <View style={{ flex: 1, alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     )}
//     allowsBackForwardNavigationGestures
//     onNavigationStateChange={(navState) => {
//       if (navState.canGoBack) {
//         navigation.setParams({
//           headerLeftInfo: {
//             title: '',
//             onPress: () => ref.current.goBack(),
//           },
//         });
//       } else {
//         navigation.setParams({
//           headerLeftInfo: null,
//         });
//       }
//     }}
//     />
//     </SafeAreaView>

//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});