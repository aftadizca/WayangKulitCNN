import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera, Home, ShowPic, About } from './src/screen';
import { screenOptions } from 'config';
import Tflite from 'tflite-react-native';

const Stack = createStackNavigator();
const tflite = new Tflite();

tflite.loadModel(
	{
		model: 'custom/model2.tflite', // required
		labels: 'custom/model.txt', // required
		numThreads: 4, // defaults to 1
	},
	(err, res) => {
		if (err) console.log(err);
		else console.log('Model Loaded');
	}
);

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={Home} options={screenOptions} />
				<Stack.Screen
					name='Camera'
					component={Camera}
					options={screenOptions}
				/>
				<Stack.Screen name='About' component={About} options={screenOptions} />
				<Stack.Screen name='Pic' options={screenOptions}>
					{(props) => <ShowPic {...props} tflite={tflite} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
