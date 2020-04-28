/**
 * @format
 */
import { AppRegistry, StatusBar } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { COLORS } from './src/config';

console.disableYellowBox = true;
console.log('index.js')
StatusBar.setBackgroundColor = COLORS.PRIMARY_DARK;

AppRegistry.registerComponent(appName, () => App);
