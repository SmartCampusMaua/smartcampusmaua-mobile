import React from "react";
import { Text, Button, View } from "react-native";


type RootScreenProps = {
    navigation: any;
}
export function RootScreen({ navigation }: RootScreenProps) {
    console.log('Entered in RootScreen')
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Root Screen</Text>
            <Button
                title="Go to Main Screen Screen"
                onPress={() => navigation.navigate('Main')}
            />
            <Button
                title="Go to Login Screen Screen"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Go to Social Login Screen"
                onPress={() => navigation.navigate('SocialLogin')}
            />
            <Button
                title="Go to Public Login Screen"
                onPress={() => navigation.navigate('PublicLogin')}
            />
            <Button
                title="Go to SignUp Screen"
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    );
}