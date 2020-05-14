import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, View } from 'react-native';
import Text from 'react-native-text';
import { MyButton, ProgressBar, Navigation } from '../components';
import Modal from 'react-native-modal';
import { styles } from './ShowPic.style';

export default function ShowPic(props) {
	const [prediction, setPrediction] = useState(undefined);
	const [isModalVisible, setModalVisible] = useState(true);
	const { navigation, tflite, route } = props;

	//identify image with cnn
	function onIdentify(img) {
		return new Promise(resolve => {
			tflite.runModelOnImage(
				{
					path: img, // required
					imageMean: 0, // defaults to 127.5
					imageStd: 255, // defaults to 127.5
					numResults: 4, // defaults to 5
					threshold: 0.5, // defaults to 0.1
					numThreads: 4,
				},
				(err, res) => {
					if (err) {
						console.warn(err);
					} else {
						if (res.length !== 0) {
							resolve(res);
						}
					}
				}
			);
		});
	}
	//hide/show modal whwn screen on focus / in background
	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused
			setModalVisible(true);

			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
				setModalVisible(false);
			};
		}, [])
	);
	//identify image
	useEffect(() => {
		onIdentify(route.params.uri).then(res => {
			setPrediction(res);
		});
	}, []);

	return (
		<View style={styles.container}>
			<Image
				resizeMode="contain"
				source={{
					uri: 'file://' + route.params.uri,
				}}
				style={styles.image}
			/>
			<Modal
				isVisible={isModalVisible}
				style={styles.modal}
				hasBackdrop={false}
				animationInTiming={300}
				useNativeDriver={true}
				onBackButtonPress={() => navigation.goBack()}>
				<Navigation {...navigation} back />
				<ModalContent {...navigation} prediction={prediction} />
			</Modal>
		</View>
	);
}

function ModalContent(props) {
	if (typeof props.prediction === 'undefined') {
		//Tampilan jika prediksi gagal
		return (
			<View style={styles.renderContent}>
				<Text style={styles.title}>KESALAHAN</Text>
				<Text style={styles.bodyText}>TIDAK DAPAT MEMPROSES GAMBAR</Text>
				<Text style={styles.bodyText}>MOHON UNTUK MENGAMBIL ULANG GAMBAR</Text>
			</View>
		);
	} else {
		//Tampilan jika prediksi sukses
		return (
			<View style={styles.renderContent}>
				<ProgressBar
					text={props.prediction[0].label}
					value={props.prediction[0].confidence}
				/>
				{props.prediction[0].index !== 3 ? (
					<MyButton
						onPress={() =>
							props.navigate('Detail', {
								wayangId: props.prediction[0].index,
							})
						}>
						Tampilkan Detail
					</MyButton>
				) : null}
			</View>
		);
	}
}
