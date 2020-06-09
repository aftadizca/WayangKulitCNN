/* eslint-disable no-undef */
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
import { screenOptions, COLORS, pathJoin } from './src/config';
import { WayangSvg } from './src/icon';
//Firebase
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { styles } from './App.style';
import LinearGradient from 'react-native-linear-gradient';
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

	// eslint-disable-next-line no-undef
	storeModelName = async modelName => {
		try {
			await AsyncStorage.setItem('@model_name', modelName);
		} catch (e) {
			console.warn(e);
		}
	};

	// eslint-disable-next-line no-undef
	getModelName = async () => {
		try {
			const value = await AsyncStorage.getItem('@model_name');
			return value;
		} catch (e) {
			console.warn(e);
		}
	};

	function loadModel(path) {
		return new Promise((resolve, reject) => {
			model.loadModel(
				{
					modelFromStorage: path, // required
					labels: 'custom/model.txt', // required
					numThreads: 4, // defaults to 1
				},
				(err, res) => {
					if (err) {
						reject(err);
					} else {
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
			.then(res => {
				let modelName = res.items[0].name;
				res.items[0].getDownloadURL().then(url => {
					RNFetchBlob.config({
						// response data will be saved to this path if it has access right.
						path: pathJoin([modelDirs, modelName]),
					})
						.fetch('GET', url, {})
						.progress((received, total) => {
							setDownloadProgress(((received / total) * 100).toFixed(0));
						})
						.then(downloadRes => {
							storeModelName(modelName).then(() => {
								setIsDownloadModel(false);
								//console.warn('The file saved to ', downloadRes.path());
							});
						})
						.catch(err => console.warn('Download Error : ', err));
				});
			});
	}

	//close model when exit app
	// useEffect(() => {
	// 	return () => {
	// 		model.close();
	// 	};
	// }, []);

	//check modelPath
	useEffect(() => {
		if (isLoading && !isDownloadModel) {
			// eslint-disable-next-line no-undef
			getModelName().then(x => {
				if (x !== null) {
					loadModel(pathJoin([modelDirs, x]))
						.then(res => {
							setModel(res);
							setTimeout(() => {
								setIsLoading(false);
							}, 1000);
						})
						.catch(err => {
							console.warn(err);
							setIsDownloadModel(true);
						});
				} else {
					setIsDownloadModel(true);
				}
			});
		}
	}, [isDownloadModel]);

	//Downloading Model
	useEffect(() => {
		if (isDownloadModel) {
			downloadModel();
		}
	}, [isDownloadModel]);

	if (isLoading) {
		return (
			<>
				<StatusBar translucent={true} backgroundColor={COLORS.TRANSPARENT} />
				<LinearGradient
					colors={COLORS.GRADIENT}
					useAngle={true}
					angle={10}
					locations={[0.5, 1]}
					angleCenter={{ x: 0.7, y: 0.7 }}
					style={styles.loadingContainer}
				>
					<View style={styles.imageView}>
						<WayangSvg />
					</View>
					{isDownloadModel && (
						<View style={styles.textView}>
							<Text style={styles.downloadText}>MENGUNDUH MODEL CNN</Text>
							<Text style={styles.progressText}>{downloadProgress} %</Text>
						</View>
					)}
				</LinearGradient>
			</>
		);
	} else {
		return (
			<NavigationContainer>
				{/* <StatusBar backgroundColor={COLORS.STATUS_BAR} /> */}
				<StatusBar translucent={true} backgroundColor={COLORS.TRANSPARENT} />
				<Stack.Navigator>
					<Stack.Screen name="Home" component={Home} options={screenOptions} />
					<Stack.Screen
						name="Camera"
						component={Camera}
						options={screenOptions}
					/>
					<Stack.Screen name="About" options={screenOptions}>
						{props => <About {...props} store={store} />}
					</Stack.Screen>
					<Stack.Screen name="Pic" options={screenOptions}>
						{props => <ShowPic {...props} tflite={model} />}
					</Stack.Screen>
					<Stack.Screen name="Detail" options={screenOptions}>
						{props => <Detail {...props} db={db} store={store} />}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
