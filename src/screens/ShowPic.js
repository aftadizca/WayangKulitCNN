import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Image, View } from 'react-native';
import Text from 'react-native-text';
import { MyButton, ProgressBar, Navigation } from '../components';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { COLORS } from '../config';
import { styles } from './ShowPic.style';

export default function ShowPic(props) {
	const { navigation, tflite, route } = props;
	const [prediction, setPrediction] = useState(undefined);
	const [isModalVisible, setModalVisible] = useState(true);
	//const [isModalRender, setModalRender] = useState(true);

	//identify image with cnn
	function onIdentify(img) {
		return new Promise(resolve => {
			tflite.runModelOnImage(
				{
					path: img, // required
					imageMean: 0, // defaults to 127.5
					imageStd: 255, // defaults to 127.5
					numResults: 4, // defaults to 5
					threshold: 0.55, // defaults to 0.1
					numThreads: 4,
				},
				(err, res) => {
					if (err) {
						console.warn(err);
					} else {
						if (res.length !== 0) {
							console.warn(res);
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
			//Do something when the screen is focused
			setModalVisible(true);
			//setModalRender(true);

			return () => {
				//Do something when the screen is unfocused
				//Useful for cleanup functions
				setModalVisible(false);
				//setModalRender(false);
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
			{/* <StatusBar translucent={true} backgroundColor={COLORS.TRANSPARENT} /> */}
			<Image
				resizeMode="contain"
				source={{
					uri: 'file://' + route.params.uri,
				}}
				style={{ ...styles.image, opacity: isModalVisible ? 1 : 0 }}
			/>

			<Modal
				isVisible={isModalVisible}
				style={styles.modal}
				hasBackdrop={true}
				backdropOpacity={0.3}
				animationInTiming={1000}
				animationOutTiming={500}
				deviceHeight={Dimensions.get('screen').height}
				coverScreen={false}
				useNativeDriver={true}
				onBackButtonPress={() => navigation.goBack()}
			>
				<ModalContent {...navigation} prediction={prediction} />
			</Modal>

			<Navigation {...navigation} back />
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
			<LinearGradient
				colors={COLORS.GRADIENT}
				useAngle={true}
				angle={10}
				angleCenter={{ x: 0.7, y: 0.3 }}
				style={styles.renderContent}
			>
				<ProgressBar
					text={props.prediction[0].label}
					value={props.prediction[0].confidence}
				/>
				{props.prediction[0].index !== 4 ? (
					<MyButton
						onPress={() =>
							props.navigate('Detail', {
								wayangId: props.prediction[0].index,
							})
						}
					>
						Tampilkan Detail
					</MyButton>
				) : null}
			</LinearGradient>
		);
	}
}
