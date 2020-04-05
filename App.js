import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera, Home, ShowPic } from 'screen';
import { screenOptions } from 'config';

const Stack = createStackNavigator();

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
				<Stack.Screen name='Pic' component={ShowPic} options={screenOptions} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
