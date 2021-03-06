/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, Image, StatusBar, TouchableNativeFeedback } from 'react-native';
import Text from 'react-native-text';
import RNFetchBlob from 'rn-fetch-blob';
import RNRestart from 'react-native-restart';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { COLORS, ICONS, pathJoin } from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import { version } from '../../package.json';
import { Navigation } from '../components';
import { Icon, Spinner, Button } from 'native-base';
import Modal from 'react-native-modal';
import { Avatar, BgSvg } from '../icon';
import { listStyles, styles, modalStyles } from './About.style';

const MODEL_TYPE = {
	checking: 0,
	updating: 1,
	updated: 2,
};

function About({ navigation, store }) {
	const [modelName, setModelName] = useState();
	const [modelNameTemp, setModelNameTemp] = useState();
	const [modalType, setModalType] = useState(MODEL_TYPE.checking);
	const [modalIsVisible, setModalVisible] = useState(false);
	//set model to storage
	storeModelName = async name => {
		try {
			await AsyncStorage.setItem('@model_name', name);
		} catch (e) {
			console.warn('AsyncStorage', e);
		}
	};
	//get model from storage
	getModelName = async () => {
		try {
			const value = await AsyncStorage.getItem('@model_name');
			return value;
		} catch (e) {
			console.warn('AsyncStorage', e);
		}
	};
	//showing update modal and check model for update
	function handleUpdate() {
		setModalVisible(true);
		setModalType(MODEL_TYPE.checking);
		store
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
	//handle button click from update modal
	function handleModelButton(type) {
		if (type) {
			RNFetchBlob.fs
				.unlink(
					pathJoin([
						RNFetchBlob.fs.dirs.MainBundleDir,
						'model',
						modelName + '.tflite',
					])
				)
				.then(() => {
					storeModelName(modelNameTemp + '.tflite').then(() => {
						RNRestart.Restart();
					});
				})
				.catch(err => {
					console.warn('err', err);
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
			<Navigation {...navigation} back />
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
			<View style={modalStyles.modalView}>
				{props.type === MODEL_TYPE.checking && (
					<>
						<Spinner color={COLORS.PRIMARY_DARK} />
						<Text style={modalStyles.text}>Cek versi model</Text>
					</>
				)}
				{props.type === MODEL_TYPE.updated && (
					<>
						<Icon style={modalStyles.icon} {...ICONS.UPDATED} />
						<Text style={modalStyles.text}>Versi Model Sudah Paling Baru</Text>
					</>
				)}
				{props.type === MODEL_TYPE.updating && (
					<>
						<Icon style={modalStyles.icon} {...ICONS.UPDATE} />
						<Text style={modalStyles.text}>Versi Model Terbaru</Text>
						<Text style={modalStyles.textItalic}>{props.newModel}</Text>
					</>
				)}
			</View>
			<View style={modalStyles.buttonContainer}>
				<Button
					style={modalStyles.button}
					rounded
					small
					block
					onPress={() => props.onPress(false)}
					androidRippleColor={COLORS.PRIMARY_LIGHT}>
					<Text style={modalStyles.textButton}>Batal</Text>
				</Button>
				{props.type === MODEL_TYPE.updating && (
					<Button
						style={[modalStyles.button, { marginLeft: 10 }]}
						rounded
						block
						onPress={() => props.onPress(true)}
						small
						androidRippleColor={COLORS.PRIMARY_LIGHT}>
						<Text style={modalStyles.textButton}>Update</Text>
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

export default About;
