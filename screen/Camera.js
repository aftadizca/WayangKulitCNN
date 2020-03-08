import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	PanResponder,
	Dimensions,
	TouchableOpacity,
	TouchableNativeFeedback
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { RNCamera } from 'react-native-camera';
import { Container, Button, Icon } from 'native-base';
import { colors, icons, DEFAULT_RATIO } from '../config';

export default class Camera extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focusPoint: { x: 0.5, y: 0.5 },
			focusLocation: { x: 0, y: 0 },
			focusPointChange: false,
			flashMode: false
		};

		const w = Dimensions.get('screen').width;
		const h = Dimensions.get('screen').height;
		let timerId = 0;

		this._panResponder = PanResponder.create({
			// Ask to be the responder:
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

			onPanResponderGrant: (evt, gestureState) => {
				const x0 = evt.nativeEvent.locationX / w;
				const y0 = evt.nativeEvent.locationY / h;
				this.setState({
					focusPoint: {
						x: y0,
						y: -x0 + 1
					},
					focusLocation: {
						x: evt.nativeEvent.locationX - 25,
						y: evt.nativeEvent.locationY - 25
					},
					focusPointChange: true
				});
				clearTimeout(timerId);
				timerId = setTimeout(() => {
					this.setState({ focusPointChange: false });
					console.log('end of ', timerId);
				}, 3000);
				console.log('timerId', timerId);
			},
			onPanResponderMove: (evt, gestureState) => { },
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: (evt, gestureState) => {
				// The user has released all touches while this view is the
				// responder. This typically means a gesture has succeeded
			},
			onPanResponderTerminate: (evt, gestureState) => {
				// Another component has become the responder, so this gesture
				// should be cancelled
			},
			onShouldBlockNativeResponder: (evt, gestureState) => {
				// Returns whether this component should block native components from becoming the JS
				// responder. Returns true by default. Is currently only supported on android.
				return true;
			}
		});
	}

	_onPressFlashMode = () => {
		this.setState((state, props) => {
			return { flashMode: !state.flashMode };
		});
	};

	takePicture = async () => {
		RNFetchBlob.fs
			.unlink(`${RNFetchBlob.fs.dirs.CacheDir}/Camera`)
			.catch(err => console.log('Deleting File'));
		if (this.camera) {
			const options = { quality: 0.5, base64: true, doNotSave: true };
			const data = await this.camera.takePictureAsync(options);
			const path = `${
				RNFetchBlob.fs.dirs.CacheDir
				}/Camera/${new Date().getTime()}.jpg`;

			RNFetchBlob.fs
				.writeFile(path, data.base64, 'base64')
				.then(() => {
					this.props.navigation.navigate('Pic', { uri: 'file://' + path });
				})
				.catch(err => console.log(err));
		}
		this.setState({ focusPointChange: false });
	};

	// _onCameraReady = async () => {
	// 	if (this.camera) {
	// 		const ratios = await this.camera.getSupportedRatiosAsync();
	// 		console.log(ratios);

	// 		const ratio = ratios.find(x => x === DEFAULT_RATIO) || ratios[ratios.length - 1]
	// 		this.setState({ ratio });

	// 	}
	// }

	render() {
		console.log("gg", this.state);
		return (
			<Container style={styles.container}>
				<RNCamera
					ref={ref => {
						this.camera = ref;
					}}
					style={styles.preview}
					type={RNCamera.Constants.Type.back}
					autoFocusPointOfInterest={this.state.focusPoint}
					autoFocus={RNCamera.Constants.AutoFocus.on}
					flashMode={
						this.state.flashMode
							? RNCamera.Constants.FlashMode.on
							: RNCamera.Constants.FlashMode.off
					}
					captureAudio={false}
					androidCameraPermissionOptions={{
						title: 'Permission to use camera',
						message: 'We need your permission to use your camera',
						buttonPositive: 'Ok',
						buttonNegative: 'Cancel'
					}}
				/>
				<View style={styles.top} {...this._panResponder.panHandlers} />

				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(colors.PRIMARY, false)}
					useForeground={true}
					onPress={this._onPressFlashMode}>
					<View style={styles.flashIconTO}>
						<Icon
							style={styles.flashIcon}
							name={
								this.state.flashMode
									? icons.FLASH_ICON.on
									: icons.FLASH_ICON.off
							}
							type={icons.FLASH_ICON.type}
						/>
					</View>
				</TouchableNativeFeedback>
				<TouchableOpacity
					transparent
					style={styles.captureButton}
					onPress={this.takePicture.bind(this)}>
					<Icon
						style={styles.captureIcon}
						name='ios-radio-button-on'
						type='Ionicons'
					/>
				</TouchableOpacity>
				<View
					style={{
						top: this.state.focusLocation.y,
						left: this.state.focusLocation.x,
						borderColor: this.state.focusPointChange
							? colors.CAMERA_FOCUS_BOX
							: 'transparent',
						...styles.focusBox
					}}
				/>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#555'
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	captureButton: {
		flex: 0,
		flexDirection: 'row',
		alignSelf: 'center',
		position: 'absolute',
		backgroundColor: 'transparent',
		marginBottom: 20,
		bottom: 0
	},
	captureIcon: {
		fontSize: 100,
		color: 'white'
	},
	flashIcon: {
		color: 'white',
		fontSize: 32,
		alignSelf: 'center'
	},
	flashIconTO: {
		flex: 1,
		position: 'absolute',
		right: 20,
		top: 20,
		borderRadius: 100,
		width: 60,
		height: 60,
		justifyContent: 'center',
		overflow: 'hidden'
	},
	focusBox: {
		width: 50,
		height: 50,
		borderWidth: 2,
		position: 'absolute'
	},
	top: {
		backgroundColor: 'transparent',
		position: 'absolute',
		width: '100%',
		height: '100%'
	}
});
