/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import { RootScreen } from './src/pages/RootScreen';
import App from './src/pages/RootStackScreen';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
