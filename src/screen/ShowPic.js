import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { COLORS, FONTS } from '../config';
import { MyButton, ProgressBar } from '../components';

export default class ShowPic extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.onIdentify(this.props.route.params.uri);
	}

	renderContent = () => {
		if (typeof this.state.prediction === 'undefined') {
			//Tampilan jika prediksi gagal
			this.bottomSheet && this.bottomSheet.snapTo(1);

			return (
				<View style={styles.renderContent}>
					<Text style={styles.title}>KESALAHAN</Text>
					<Text style={styles.bodyText}>TIDAK DAPAT MEMPROSES GAMBAR</Text>
					<Text style={styles.bodyText}>
						MOHON UNTUK MENGAMBIL ULANG GAMBAR
					</Text>
				</View>
			);
		} else {
			//Tampilan jika prediksi sukses
			this.bottomSheet && this.bottomSheet.snapTo(0);

			return (
				<View style={styles.renderContent}>
					<ProgressBar
						text={this.state.prediction[0].label}
						value={this.state.prediction[0].confidence}
					/>
					<MyButton>Tampilkan Detail</MyButton>
				</View>
			);
		}
	};

	renderHeader = () => (
		<View style={{ backgroundColor: 'white', height: 50 }} />
	);

	onIdentify = (img) => {
		this.props.tflite.runModelOnImage(
			{
				path: img, // required
				imageMean: 0, // defaults to 127.5
				imageStd: 255, // defaults to 127.5
				numResults: 4, // defaults to 5
				threshold: 0.1, // defaults to 0.1
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
					resizeMode='cover'
					source={{
						uri: 'file://' + this.props.route.params.uri,
					}}
					style={styles.image}
				/>
				<BottomSheet
					ref={(ref) => {
						this.bottomSheet = ref;
					}}
					snapPoints={['52.8%', '41%']}
					enabledManualSnapping={true}
					onOpenEnd={this.onOpenEnd}
					onCloseEnd={this.onCloseEnd}
					renderContent={this.renderContent}
					enabledBottomInitialAnimation={true}
					springConfig={{
						damping: 1000,
						mass: 2,
						stiffness: 300,
						toss: 1,
						restDisplacementThreshold: 0.3,
						restSpeedThreshold: 0.3,
					}}
				/>
			</View>
		);
	}
}

function precise(x) {
	return Number.parseFloat(x * 100).toPrecision(4);
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
	},
	renderContent: {
		backgroundColor: 'white',
		minHeight: '50%',
		padding: 20,
		marginLeft: 30,
		marginRight: 30,
		paddingBottom: 25,
		borderRadius: 20,
		backgroundColor: COLORS.PRIMARY_LIGHT,
		elevation: 10,
		shadowColor: COLORS.PRIMARY_DARK,
		shadowRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.PRIMARY_DARK,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontFamily: FONTS.BOLD,
		fontSize: 32,
		color: COLORS.PRIMARY_DARK,
	},
	bodyText: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
	},
});
