/**
 * @format
 */

import 'react-native-gesture-handler';   // 👈 ESTA ES LA LÍNEA NECESARIA

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

