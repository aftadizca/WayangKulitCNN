import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { COLORS, FONTS } from '../config';
import MyButton from '../components/MyButton';
import ProgressBar from '../components/ProgressBar';

export default class ShowPic extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.onIdentify(this.props.route.params.uri);
	}

	renderContent = () => (
		<View style={styles.renderContent}>
			<ProgressBar text={'Bukan Wayang'} value={50.56} />
			<MyButton>Tampilkan Detail</MyButton>
		</View>
	);
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
				threshold: 0, // defaults to 0.1
				numThreads: 4,
			},
			(err, res) => {
				if (err) console.log(err);
				else {
					if (res.length !== 0) {
						console.log('res', res);
						console.log(
							'prediction ->',
							res[0].label + ' : ' + res[0].confidence
						);
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
				{/* <View style={{ zIndex: 0, position: 'absolute', bottom: 20 }}>
					<Text style={{ backgroundColor: '#f00', padding: 5 }}>
						{this.state.prediction
							? this.state.prediction[0].label +
							  ' ' +
							  this.state.prediction[0].confidence
							: 'Gambar tidak diketahui'}
					</Text>
				</View> */}
				<BottomSheet
					snapPoints={['52%']}
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
		minHeight: '70%',
		padding: 20,
		marginLeft: 30,
		marginRight: 30,
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
});
