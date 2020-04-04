import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
//import RNFetchBlob from 'rn-fetch-blob';
import Tflite from 'tflite-react-native';

let tflite = new Tflite();

export default class Hello extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.onIdentify(this.props.route.params.uri);
	}

	loadModel() {
		tflite.loadModel(
			{
				model: 'custom/model.tflite', // required
				labels: 'custom/model.txt', // required
				numThreads: 1 // defaults to 1
			},
			(err, res) => {
				if (err) console.log(err);
				else console.log(res);
			}
		);
	}

	onIdentify = img => {
		console.log('img', img);
		this.loadModel();
		tflite.runModelOnImage(
			{
				path: img, // required
				imageMean: 0, // defaults to 127.5
				imageStd: 255, // defaults to 127.5
				numResults: 4, // defaults to 5
				threshold: 0.1, // defaults to 0.1
				numThreads: 4
			},
			(err, res) => {
				if (err) console.log(err);
				else {
					console.log('res', res);
					this.setState({ prediction: res });
				}
			}
		);
	};

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image
					resizeMode='cover'
					source={{
						uri: 'file://' + this.props.route.params.uri + '?' + new Date()
					}}
					style={{
						width: '100%',
						height: '100%'
					}}
				/>
				<View style={{ zIndex: 0, position: 'absolute', bottom: 20 }}>
					<Text style={{ backgroundColor: '#f00', padding: 5 }}>
						{this.state.prediction & this.state.prediction[0]}
					</Text>
				</View>
			</View>
		);
	}
}
