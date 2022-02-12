/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/navigation/AppNavigation';
// import App from './src/screens/Login';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
