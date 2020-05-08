import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import Tflite from 'tflite-react-native';
//local
import { Camera, Home, ShowPic, About, Detail } from './src/screens';
import { screenOptions, COLORS, FONTS, pathJoin } from './src/config';
import { WayangSvg } from './src/icon';
//Firebase
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
//Navigation
const Stack = createStackNavigator();

const db = firestore().collection('Wayang');
const store = storage();
const modelDirs = pathJoin([RNFetchBlob.fs.dirs.MainBundleDir, 'model']);

export default function App() {
	const [model, setModel] = useState(new Tflite());
	const [isLoading, setIsLoading] = useState(true);
	const [downloadProgress, setDownloadProgress] = useState(0);
	const [isDownloadModel, setIsDownloadModel] = useState(false);

	storeModelName = async (modelName) => {
		try {
			await AsyncStorage.setItem('@model_name', modelName);
		} catch (e) {
			console.log('AsyncStorage', e);
		}
	};

	getModelName = async () => {
		try {
			const value = await AsyncStorage.getItem('@model_name');
			return value;
		} catch (e) {
			console.log('AsyncStorage', e);
		}
	};

	function loadModel(path, model) {
		return new Promise((resolve) => {
			model.loadModel(
				{
					modelFromStorage: path, // required
					labels: 'custom/model.txt', // required
					numThreads: 4, // defaults to 1
				},
				(err, res) => {
					if (err) {
						console.log('Load Model', err);
					} else {
						console.log('Model Loaded : ' + path);
						resolve(model);
					}
				}
			);
		});
	}

	function downloadModel() {
		store
			.ref('model')
			.listAll()
			.then((res) => {
				let modelName = res.items[0].name;
				res.items[0].getDownloadURL().then((url) => {
					RNFetchBlob.config({
						// response data will be saved to this path if it has access right.
						path: pathJoin([modelDirs, modelName]),
					})
						.fetch('GET', url, {})
						.progress((received, total) => {
							setDownloadProgress(((received / total) * 100).toFixed(0));
						})
						.then((res) => {
							storeModelName(modelName).then(() => {
								setIsDownloadModel(false);
								console.log('The file saved to ', res.path());
							});
						})
						.catch((err) => console.log('Download Error : ', err));
				});
			});
	}

	//check modelPath
	useEffect(() => {
		if (isLoading && !isDownloadModel) {
			getModelName().then((x) => {
				if (x !== null) {
					loadModel(pathJoin([modelDirs, x]), model).then((res) => {
						setModel(res);
						setIsLoading(false);
					});
					console.log('Model detected:', x);
				} else {
					setIsDownloadModel(true);
				}
			});
		}
		console.log('Effect : Check model');
	}, [isDownloadModel]);

	//Downloading Model
	useEffect(() => {
		if (isDownloadModel) {
			downloadModel();
		}
		console.log('Effect : DL model');
	}, [isDownloadModel]);

	if (isLoading) {
		return (
			<>
				<StatusBar backgroundColor={COLORS.PRIMARY_DARK} />
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: COLORS.PRIMARY_DARK,
						flexDirection: 'column',
					}}>
					<View style={{ width: '40%', height: '30%' }}>
						<WayangSvg />
					</View>
					{isDownloadModel && (
						<View style={{ alignItems: 'center' }}>
							<Text
								style={{
									fontFamily: FONTS.BOLD,
									color: COLORS.PRIMARY_LIGHT,
									fontSize: 18,
									marginBottom: 10,
								}}>
								Downloading CNN Model
							</Text>
							<Text
								style={{
									fontFamily: FONTS.CONDENSED,
									color: COLORS.PRIMARY_LIGHT,
									fontSize: 60,
								}}>
								{downloadProgress} %
							</Text>
						</View>
					)}
				</View>
			</>
		);
	} else {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name='Home' component={Home} options={screenOptions} />
					<Stack.Screen
						name='Camera'
						component={Camera}
						options={screenOptions}
					/>
					<Stack.Screen
						name='About'
						component={About}
						options={screenOptions}
					/>
					<Stack.Screen name='Pic' options={screenOptions}>
						{(props) => <ShowPic {...props} tflite={model} />}
					</Stack.Screen>
					<Stack.Screen name='Detail' options={screenOptions}>
						{(props) => <Detail {...props} db={db} store={store} />}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
