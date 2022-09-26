/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Navigator from './Navigator';
import Register from './Architecture/Views/Register';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);
