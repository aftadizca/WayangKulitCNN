import React, { Component } from 'react';
import { Image, Dimensions, View } from 'react-native';

export default class Hello extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image
					resizeMode='cover'
					source={{ uri: this.props.route.params.uri + '?' + +new Date() }}
					style={{
						width: '100%',
						height: '100%'
					}}
				/>
			</View>
		);
	}
}
