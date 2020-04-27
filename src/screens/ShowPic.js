import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Text from 'react-native-text';
import { COLORS, FONTS } from '../config';
import { MyButton, ProgressBar } from '../components';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

export default class ShowPic extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.onIdentify(this.props.route.params.uri);
	}

	onIdentify = (img) => {
		this.props.tflite.runModelOnImage(
			{
				path: img, // required
				imageMean: 0, // defaults to 127.5
				imageStd: 255, // defaults to 127.5
				numResults: 4, // defaults to 5
				threshold: 0.4, // defaults to 0.1
				numThreads: 4,
			},
			(err, res) => {
				if (err) console.log(err);
				else {
					if (res.length !== 0) {
						// console.log('res', res);
						// console.log(
						// 	'prediction ->',
						// 	res[0].label + ' : ' + res[0].confidence
						// );
						this.setState({ prediction: res });
					}
				}
			}
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<Image
					resizeMode='contain'
					source={{
						uri: 'file://' + this.props.route.params.uri,
					}}
					style={styles.image}
				/>
				<Modal
					isVisible={true}
					style={styles.modal}
					hasBackdrop={false}
					animationInTiming={800}
					onBackButtonPress={() => this.props.navigation.goBack()}>
					<ModalContent prediction={this.state.prediction} />
				</Modal>
			</View>
		);
	}
}

function ModalContent(props) {
	console.log('prediksi', props.prediction);
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
				{props.prediction[0].index !== 3 ? <MyButton>Tampilkan Detail</MyButton> : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	modal: {
		justifyContent: 'flex-end',
		margin: 0,
	},

	renderContent: {
		padding: widthPercentageToDP('5%'),
		backgroundColor: COLORS.PRIMARY_LIGHT,
		borderWidth: 1,
		alignItems: 'center',
	},
	title: {
		fontFamily: FONTS.BOLD,
		fontSize: 28,
		color: COLORS.PRIMARY_DARK,
	},
	bodyText: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
	},
});
