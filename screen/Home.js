import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { colors, styles, icons } from '../config';
import { Text, Container, Header, Left, Right, Body, Title } from 'native-base';
import Button from '../components/Button';
import { Col, Row, Grid } from 'react-native-easy-grid';
import BG from '../icon/bg2.svg';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Container>
				<Header
					androidStatusBarColor={colors.PRIMARY_DARK}
					style={styles.headerHome}>
					<Left />
					<Body>
						<Title style={styles.headerTitle}>SI DANGKU</Title>
					</Body>
					<Right />
				</Header>
				<Grid>
					<Row
						style={{
							flex: 2,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: colors.PRIMARY_DARK
						}}>
						<View
							style={{
								width: '100%',
								height: '100%',
								backgroundColor: colors.PRIMARY_LIGHT
							}}>
							<BG />
						</View>
					</Row>
					<Row
						style={{
							backgroundColor: colors.PRIMARY_LIGHT,
							justifyContent: 'center',
							alignItems: 'center',
							flex: 3
						}}>
						<Button
							style={styles.buttonPrimary}
							onPress={() =>
								this.props.navigation.navigate('Camera', { Id: 'myparams' })
							}>
							LAUNCH CAMERA
						</Button>
					</Row>
				</Grid>
			</Container>
		);
	}
}
