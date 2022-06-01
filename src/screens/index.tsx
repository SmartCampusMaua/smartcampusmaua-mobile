import React, { useEffect, useRef, useState } from "react";
import { Animated,Button,Dimensions, StyleSheet, Text, View } from "react-native";
import * as BootSplash from "react-native-bootsplash";
import { NavigationContainer } from "@react-navigation/native";
import { MainScreen } from './MainScreen';
import bootSplashLogo from "../assets/images/BootSplashLogo/SmartCampusMauaLogo_512x512.png";
import { RootStack } from "../navigation/RootStackNavigator";
import { RootScreen } from "./RootScreen"

const fakeApiCallWithoutBadNetwork = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// import { RootStack } from '../navigation/RootStackNavigator'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const App = () => {
  const [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(false);
  const opacity = useRef(new Animated.Value(1));
  const translateY = useRef(new Animated.Value(0));

  const init = async () => {
    // You can uncomment this line to add a delay on app startup
    // await fakeApiCallWithoutBadNetwork(3000);
    try {
      await BootSplash.hide();

      Animated.stagger(250, [
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: -150,
        }),
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: Dimensions.get("window").height,
        }),
      ]).start();

      Animated.timing(opacity.current, {
        useNativeDriver: true,
        toValue: 0,
        duration: 130,
        delay: 750,
      }).start(() => {
        setBootSplashIsVisible(false);
      });
    } catch (error) {
      setBootSplashIsVisible(false);
    }
  };

  useEffect(() => {
    bootSplashLogoIsLoaded && init();
  }, [bootSplashLogoIsLoaded]);


  const isLoggedIn = false

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Root">
        <RootStack.Screen name="Root" component={RootScreen} />
        <RootStack.Screen name="Main" component={MainScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="SignUp" component={SignUpScreen} />
        <RootStack.Screen name="SocialLogin" component={SocialLoginScreen} />
        <RootStack.Screen name="PublicLogin" component={PublicLoginScreen} />
      </RootStack.Navigator>

      {bootSplashIsVisible && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.bootsplash,
            { opacity: opacity.current },
          ]}
        >
          <Animated.Image
            source={bootSplashLogo}
            fadeDuration={0}
            // resizeMode="contain"
            onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
            style={[
              styles.logo,
              { transform: [{ translateY: translateY.current }] },
            ]}
          />
        </Animated.View>
      )}

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#455",
  },
  bootsplash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  logo: {
    height: 300,
    width: 300,
  },
});





// type MainScreenProps = {
//   navigation: any;
// }
// function MainScreen({ navigation }: MainScreenProps) {
//   console.log('Entered in Main Screen')
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Main Screen</Text>
//       <Button
//         title="Go to Root"
//         onPress={() => navigation.navigate('Root')}
//       />
//     </View>
//   );
// }


type LoginScreenProps = {
  navigation: any;
}
function LoginScreen({ navigation }: LoginScreenProps) {
  console.log('Entered in Login Screen')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <Button
        title="Go to Root"
        onPress={() => navigation.navigate('Root')}
      />
    </View>
  );
}

type SignUpScreenProps = {
  navigation: any;
}
function SignUpScreen({ navigation }: SignUpScreenProps) {
  console.log('Entered in SignUp Screen')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SignUp Screen</Text>
      <Button
        title="Go to Root"
        onPress={() => navigation.navigate('Root')}
      />
    </View>
  );
}

type SocialLoginProps = {
  navigation: any;
}
function SocialLoginScreen({ navigation }: SocialLoginProps) {
  console.log('Entered in SocialLogin')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Social Login</Text>
      <Button
        title="Go to Root"
        onPress={() => navigation.navigate('Root')}
      />
    </View>
  );
}

type PublicLoginProps = {
  navigation: any;
}
function PublicLoginScreen({ navigation }: PublicLoginProps) {
  console.log('Entered in PublicLogin')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Public Login</Text>
      <Button
        title="Go to Root"
        onPress={() => navigation.navigate('Root')}
      />
    </View>
  );
}