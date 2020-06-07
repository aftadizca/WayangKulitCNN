/* eslint-disable no-undef */
import React, { useCallback } from 'react';
import { View, BackHandler, ToastAndroid } from 'react-native';
import Text from 'react-native-text';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../config';
import { Container } from 'native-base';
import { ButtonMenu } from '../components';
import { Row, Grid, Col } from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './Home.style';
//icon
import { BgSvg, GallerySvg, WayangSvg, CameraSvg, InfoSvg } from '../icon';

export default function Home({ navigation }) {
	//handle back exit
	timer = undefined;
	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				if (!timer) {
					ToastAndroid.showWithGravityAndOffset(
						'Tekan tombol kembali sekali lagi untuk keluar',
						ToastAndroid.SHORT,
						ToastAndroid.BOTTOM,
						25,
						50
					);
					timer = setTimeout(() => {
						clearTimeout(timer);
						timer = undefined;
					}, 2500);
				} else {
					BackHandler.exitApp();
				}
				return true;
			};
			BackHandler.addEventListener('hardwareBackPress', onBackPress);
			return () =>
				BackHandler.removeEventListener('hardwareBackPress', onBackPress);
		}, [])
	);
	//Open native gallery to select image
	openImagePicker = () => {
		const options = {
			title: 'Pilih Gambar Wayang',
			customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};
		ImagePicker.launchImageLibrary(options, response => {
			if (response.didCancel) {
				//console.warn('User cancelled image picker');
			} else if (response.error) {
				//console.warn('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				//console.warn('User tapped custom button: ', response.customButton);
			} else {
				navigation.navigate('Pic', { uri: response.path });
			}
		});
	};

	return (
		<Container>
			<Grid>
				<LinearGradient
					colors={COLORS.GRADIENT}
					useAngle={true}
					angle={10}
					angleCenter={{ x: 0.7, y: 0.3 }}
					style={styles.rowTop}
				>
					<Col style={styles.rowTopCol}>
						<Text style={styles.headerTitle}>SIDANGKU</Text>
						<Text style={styles.headerSubtitle}>
							Sistem Identifikasi Wayang Kulit
						</Text>
					</Col>
					<Col>
						<WayangSvg />
					</Col>
				</LinearGradient>
				<Row style={styles.rowBackground}>
					<View style={styles.viewBackground}>
						<BgSvg />
					</View>
				</Row>
				<Row style={styles.rowMenu}>
					<ButtonMenu
						text="AMBIL GAMBAR"
						caption="Ambil gambar menggunakan camera"
						icon={<CameraSvg />}
						onPress={() => navigation.navigate('Camera', { Id: 'myparams' })}
					/>
					<ButtonMenu
						text={'PILIH GAMBAR'}
						icon={<GallerySvg />}
						caption="Pilih gambar dari gallery"
						onPress={openImagePicker}
					/>
					<ButtonMenu
						text={'TENTANG'}
						icon={<InfoSvg />}
						caption="Informasi tentang aplikasi"
						onPress={() => navigation.navigate('About')}
					/>
				</Row>
			</Grid>
		</Container>
	);
}
