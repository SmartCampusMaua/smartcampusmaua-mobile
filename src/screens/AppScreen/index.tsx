import React from 'react';
import { MainScreen } from '../MainScreen';
import { AppStack } from '../../navigation/AppStackNavigator';

export const AppScreen = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Main" component={MainScreen}/>
    </AppStack.Navigator>

  )
}