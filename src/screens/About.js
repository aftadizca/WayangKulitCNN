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
import { Grid, Row, Col } from 'react-native-easy-grid';
import { COLORS, FONTS, ICONS } from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import { version } from '../../package.json';
import { Navigation } from '../components';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Button, Icon } from 'native-base';
import Avatar from '../icon/avatar.jpg';
import BG from '../icon/bg2.svg';

function About(props) {
	const [modelName, setModelName] = useState(null);
	//sgetet model to storage
	storeModelName = async modelName => {
		try {
			await AsyncStorage.setItem('@model_name', modelName);
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
	//effect model version
	useEffect(() => {
		getModelName().then(res => {
			setModelName(res.replace('.tflite', ''));
		});
	}, [modelName]);

	return (
		<Grid>
			<StatusBar backgroundColor={COLORS.PRIMARY_DARK} />
			<Navigation {...props} back />
			<Row size={3} style={styles.rOne}>
				<Col
					style={{
						padding: 5,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Image
						source={Avatar}
						resizeMethod="resize"
						resizeMode="stretch"
						style={styles.image}
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
					<BG />
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
				/>
			</Row>
		</Grid>
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
		marginBottom: 10,
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
	rightIconView: { borderRadius: 100, padding: 5, overflow: 'hidden' },
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
	image: {
		height: widthPercentageToDP('35%'),
		width: widthPercentageToDP('35%'),
		borderRadius: widthPercentageToDP('17.5%'),
	},
	viewBackground: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
});

export default About;
