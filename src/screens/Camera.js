import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	PanResponder,
	Dimensions,
	TouchableOpacity,
	TouchableNativeFeedback,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { RNCamera } from 'react-native-camera';
import { Container, Icon } from 'native-base';
import { COLORS, ICONS } from '../config';
import { Navigation } from '../components';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default class Camera extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focusPoint: { x: 0.5, y: 0.5 },
			focusLocation: { x: 0, y: 0 },
			focusPointChange: false,
			flashMode: RNCamera.Constants.FlashMode.off,
			cameraVisible: false,
		};

		const w = Dimensions.get('screen').width;
		const h = Dimensions.get('screen').height;
		let timerId = 0;

		this._panResponder = PanResponder.create({
			// Ask to be the responder:
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
			onMoveShouldSetPanResponder: (evt, gestureState) => false,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
			onPanResponderGrant: (evt, gestureState) => {
				const x0 = evt.nativeEvent.locationX / w;
				const y0 = evt.nativeEvent.locationY / h;
				this.setState({
					focusPointChange: true,
					focusPoint: {
						x: y0,
						y: -x0 + 1,
					},
					focusLocation: {
						x: evt.nativeEvent.locationX - 25,
						y: evt.nativeEvent.locationY - 25,
					},
				});
				clearTimeout(timerId);
				timerId = setTimeout(() => {
					this.setState({ focusPointChange: false });
				}, 3000);
			},
			onPanResponderMove: (evt, gestureState) => {},
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
			},
		});
	}

	_setCameraVisble = value => {
		setTimeout(() => {
			this.setState({
				cameraVisible: value,
			});
		}, 300); // Delay 300 ms
	};

	componentDidMount() {
		this._inFocus = this.props.navigation.addListener('focus', () => {
			this._setCameraVisble(true);
		});
	}

	componentWillUnmount() {
		this._inFocus();
		RNFetchBlob.fs
			.unlink(RNFetchBlob.fs.dirs.CacheDir + '/Camera')
			.catch(e => console.warn(e));
	}

	_onPressFlashMode = () => {
		this.setState((state, props) => {
			return { flashMode: flashModeCycle.next(state.flashMode) };
		});
	};

	_takePicture = async () => {
		if (this.camera) {
			const options = {
				quality: 0.95,
				base64: false,
				writeExif: false,
			};
			const data = await this.camera.takePictureAsync(options);
			this.setState({ focusPointChange: false, cameraVisible: false });
			this.props.navigation.navigate('Pic', { uri: data.uri });
		}
	};

	render() {
		return (
			<Container style={styles.container}>
				{this.state.cameraVisible && (
					<RNCamera
						ref={ref => {
							this.camera = ref;
						}}
						style={styles.preview}
						ratio="16:9"
						type={RNCamera.Constants.Type.back}
						autoFocusPointOfInterest={this.state.focusPoint}
						autoFocus={RNCamera.Constants.AutoFocus.on}
						flashMode={this.state.flashMode}
						captureAudio={false}
						androidCameraPermissionOptions={{
							title: 'Permission to use camera',
							message: 'We need your permission to use your camera',
							buttonPositive: 'Ok',
							buttonNegative: 'Cancel',
						}}
					/>
				)}
				<View style={styles.touchFocus} {...this._panResponder.panHandlers} />

				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(COLORS.PRIMARY, false)}
					useForeground={true}
					onPress={this._onPressFlashMode}>
					<View style={styles.flashIconTO}>
						<Icon
							style={styles.flashIcon}
							name={ICONS.FLASH_ICON[this.state.flashMode]}
							type={ICONS.FLASH_ICON.type}
						/>
					</View>
				</TouchableNativeFeedback>
				<TouchableOpacity
					transparent
					style={styles.captureButton}
					onPress={this._takePicture.bind(this)}>
					<Icon
						style={styles.captureIcon}
						name={ICONS.CAPTURE_ICON.name}
						type={ICONS.CAPTURE_ICON.type}
					/>
				</TouchableOpacity>
				<View
					// eslint-disable-next-line react-native/no-inline-styles
					style={{
						top: this.state.focusLocation.y,
						left: this.state.focusLocation.x,
						borderColor: this.state.focusPointChange
							? COLORS.CAMERA_FOCUS_BOX
							: 'transparent',
						...styles.focusBox,
					}}
				/>
				<Navigation defaultOpacity={0.5} {...this.props.navigation} back />
			</Container>
		);
	}
}

const flashModeCycle = {
	next: function(num) {
		switch (num) {
			case RNCamera.Constants.FlashMode.off:
				return RNCamera.Constants.FlashMode.on;
			case RNCamera.Constants.FlashMode.on:
				return RNCamera.Constants.FlashMode.auto;
			default:
				return RNCamera.Constants.FlashMode.off;
		}
	},
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#555',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	captureButton: {
		flex: 0,
		flexDirection: 'row',
		alignSelf: 'center',
		position: 'absolute',
		backgroundColor: 'transparent',
		marginBottom: 20,
		bottom: 0,
	},
	captureIcon: {
		fontSize: 100,
		color: 'white',
	},
	flashIcon: {
		color: 'white',
		fontSize: 32,
		alignSelf: 'center',
		marginLeft: 6,
		marginRight: 6,
	},
	flashIconTO: {
		flex: 1,
		position: 'absolute',
		top: widthPercentageToDP('2%'),
		right: widthPercentageToDP('2%'),
		borderRadius: 100,
		justifyContent: 'center',
		overflow: 'hidden',
		height: 45,
	},
	focusBox: {
		width: 50,
		height: 50,
		borderWidth: 2,
		position: 'absolute',
	},
	touchFocus: {
		backgroundColor: 'transparent',
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
});
