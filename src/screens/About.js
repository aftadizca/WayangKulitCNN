/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import {
	View,
	Image,
	StyleSheet,
	StatusBar,
	TouchableNativeFeedback,
} from 'react-native';
import Text from 'react-native-text';
import RNRestart from 'react-native-restart';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { COLORS, FONTS, ICONS } from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import { version } from '../../package.json';
import { Navigation } from '../components';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Icon, Spinner, Button } from 'native-base';
import Modal from 'react-native-modal';
import { Avatar, BgSvg } from '../icon';

const MODEL_TYPE = {
	checking: 0,
	updating: 1,
	updated: 2,
};

function About(props) {
	const [modelName, setModelName] = useState();
	const [modelNameTemp, setModelNameTemp] = useState();
	const [modalType, setModalType] = useState(MODEL_TYPE.checking);
	const [modalIsVisible, setModalVisible] = useState(false);
	//sgetet model to storage
	storeModelName = async name => {
		try {
			await AsyncStorage.setItem('@model_name', name);
		} catch (e) {
			console.log('AsyncStorage', e);
		}
	};
	//get model from storage
	getModelName = async () => {
		try {
			const value = await AsyncStorage.getItem('@model_name');
			return value;
		} catch (e) {
			console.log('AsyncStorage', e);
		}
	};

	function handleUpdate() {
		setModalVisible(true);
		setModalType(MODEL_TYPE.checking);
		props.store
			.ref('model')
			.listAll()
			.then(res => {
				if (res.items[0].name.replace('.tflite', '') === modelName) {
					setModalType(MODEL_TYPE.updated);
				} else {
					setModalType(MODEL_TYPE.updating);
					setModelNameTemp(res.items[0].name.replace('.tflite', ''));
				}
			});
	}

	function handleModelButton(type) {
		if (type) {
			storeModelName(modelNameTemp + '.tflite').then(() => {
				RNRestart.Restart();
			});
		} else {
			setModalVisible(false);
		}
	}
	//effect model version
	useEffect(() => {
		getModelName().then(res => {
			setModelName(res.replace('.tflite', ''));
		});
	}, []);

	return (
		<Grid>
			<StatusBar backgroundColor={COLORS.PRIMARY_DARK} />
			<Navigation {...props} back />
			<Row size={3} style={styles.rOne}>
				<Col style={styles.rOneCol}>
					<Image
						source={Avatar}
						resizeMethod="resize"
						resizeMode="stretch"
						style={styles.rOneColImg}
					/>
				</Col>
				<Col>
					<Text adjustsFontSizeToFit style={styles.nameText}>
						Afta Dizca Wahana
					</Text>
					<Text style={styles.nameSubText}>Teknik Informatika</Text>
					<Text style={styles.nameSubText}>UMAHA</Text>
				</Col>
			</Row>
			<Row size={2}>
				<View style={styles.viewBackground}>
					<BgSvg />
				</View>
			</Row>
			<Row size={4} style={styles.rThree}>
				<AboutList
					title="Versi Aplikasi"
					desc={version}
					iconLeft={ICONS.APP_VERSION}
				/>
				<AboutList
					title="Versi Model"
					desc={modelName}
					iconRight={ICONS.UPDATE}
					iconLeft={ICONS.CNN_VERSION}
					iconRightOnPress={handleUpdate}
				/>
			</Row>
			<UpdateModal
				visible={modalIsVisible}
				type={modalType}
				onPress={x => handleModelButton(x)}
				newModel={modelNameTemp}
			/>
		</Grid>
	);
}

function UpdateModal(props) {
	return (
		<Modal style={{}} isVisible={props.visible}>
			<View
				style={{
					backgroundColor: COLORS.PRIMARY_LIGHT,
					padding: widthPercentageToDP('4%'),
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{props.type === MODEL_TYPE.checking && (
					<>
						<Spinner color={COLORS.PRIMARY_DARK} />
						<Text
							style={{
								fontFamily: FONTS.BOLD,
								fontSize: 16,
								color: COLORS.PRIMARY_DARK,
							}}>
							Cek versi model
						</Text>
					</>
				)}
				{props.type === MODEL_TYPE.updated && (
					<>
						<Icon
							style={{ fontSize: 48, color: COLORS.PRIMARY_DARK }}
							{...ICONS.UPDATED}
						/>
						<Text
							style={{
								fontFamily: FONTS.BOLD,
								fontSize: 16,
								color: COLORS.PRIMARY_DARK,
							}}>
							Versi Model Sudah Paling Baru
						</Text>
					</>
				)}
				{props.type === MODEL_TYPE.updating && (
					<>
						<Icon
							style={{ fontSize: 48, color: COLORS.PRIMARY_DARK }}
							{...ICONS.UPDATE}
						/>
						<Text
							style={{
								fontFamily: FONTS.BOLD,
								fontSize: 16,
								color: COLORS.PRIMARY_DARK,
							}}>
							Versi Model Terbaru
						</Text>
						<Text
							style={{
								fontFamily: FONTS.BOLD_ITALIC,
								fontSize: 16,
								color: COLORS.PRIMARY_DARK,
							}}>
							{props.newModel}
						</Text>
					</>
				)}
			</View>
			<View
				style={{
					backgroundColor: COLORS.PRIMARY_LIGHT,
					alignItems: 'center',
					justifyContent: 'space-evenly',
					flexDirection: 'row',

					padding: widthPercentageToDP('4%'),
				}}>
				<Button
					style={{
						backgroundColor: COLORS.PRIMARY_DARK,
						width: '30%',
						justifyContent: 'center',
					}}
					rounded
					small
					block
					onPress={() => props.onPress(false)}
					androidRippleColor={COLORS.PRIMARY_LIGHT}>
					<Text
						style={{
							fontFamily: FONTS.BOLD,
							fontSize: 16,
							color: COLORS.PRIMARY_LIGHT,
						}}>
						Batal
					</Text>
				</Button>
				{props.type === MODEL_TYPE.updating && (
					<Button
						style={{
							backgroundColor: COLORS.PRIMARY_DARK,
							marginLeft: 10,
							width: '30%',
							justifyContent: 'center',
						}}
						rounded
						block
						onPress={() => props.onPress(true)}
						small
						androidRippleColor={COLORS.PRIMARY_LIGHT}>
						<Text
							style={{
								fontFamily: FONTS.BOLD,
								fontSize: 16,
								color: COLORS.PRIMARY_LIGHT,
							}}>
							Update
						</Text>
					</Button>
				)}
			</View>
		</Modal>
	);
}

function AboutList(props) {
	const { iconLeft, iconRight, title, desc } = props;
	return (
		<View style={listStyles.container}>
			<View style={listStyles.left}>
				<Icon style={listStyles.iconLeft} {...iconLeft} />
			</View>
			<View style={listStyles.center}>
				<Text style={listStyles.centerTextTop}>{title}</Text>
				<Text style={listStyles.centerTextBottom}>{desc}</Text>
			</View>
			<View style={listStyles.right}>
				{iconRight && (
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							COLORS.PRIMARY_LIGHT,
							false
						)}
						onPress={props.iconRightOnPress}
						useForeground={true}>
						<View style={listStyles.rightIconView}>
							<Icon style={listStyles.rightIcon} {...iconRight} />
						</View>
					</TouchableNativeFeedback>
				)}
			</View>
		</View>
	);
}

const listStyles = StyleSheet.create({
	container: {
		width: '80%',
		marginBottom: heightPercentageToDP('2%'),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: heightPercentageToDP('10%'),
		backgroundColor: COLORS.PRIMARY_DARK,
		borderRadius: widthPercentageToDP('50%'),
	},
	iconLeft: {
		color: COLORS.PRIMARY_LIGHT,
	},
	left: {
		width: '25%',
		alignItems: 'center',
	},
	center: { width: '50%' },
	centerTextTop: {
		fontFamily: FONTS.REGULAR,
		fontSize: 18,
		color: COLORS.PRIMARY_LIGHT,
	},
	centerTextBottom: {
		fontFamily: FONTS.LIGHT,
		fontSize: 16,
		opacity: 0.7,
		color: COLORS.PRIMARY_LIGHT,
	},
	right: {
		width: '25%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightIconView: { borderRadius: 100, padding: 8, overflow: 'hidden' },
	rightIcon: {
		color: COLORS.PRIMARY_LIGHT,
		marginLeft: 0,
		marginRight: 0,
	},
});

const styles = StyleSheet.create({
	rOne: {
		backgroundColor: COLORS.PRIMARY_DARK,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rOneCol: {
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rOneColImg: {
		height: widthPercentageToDP('35%'),
		width: widthPercentageToDP('35%'),
		borderRadius: widthPercentageToDP('17.5%'),
	},
	rThree: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'column',
		paddingTop: heightPercentageToDP('8%'),
	},
	nameText: {
		fontFamily: FONTS.BOLD,
		marginBottom: heightPercentageToDP('0.5%'),
		fontSize: 18,
		color: COLORS.PRIMARY_LIGHT,
	},
	nameSubText: {
		fontFamily: FONTS.LIGHT,
		fontSize: 16,
		color: COLORS.PRIMARY_LIGHT,
		opacity: 0.5,
	},
	listPrimaryText: {
		fontFamily: FONTS.BOLD,
		marginBottom: heightPercentageToDP('0.5%'),
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
	},
	listSecondaryText: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
		opacity: 0.7,
	},
	viewBackground: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
});

export default About;
