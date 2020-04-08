import React, { Component } from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { colors, styles, icons } from 'config';
import { Text, Container, Header, Left, Right, Body, Title } from 'native-base';
import ButtonMenu from '../components/ButtonMenu';
import { Col, Row, Grid } from 'react-native-easy-grid';
import BG from '../icon/bg2.svg';
import CameraSvg from '../icon/camera.svg';

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
					<Row style={stylesHome.rowBackground}>
						<View style={stylesHome.viewBackground}>
							<BG />
						</View>
					</Row>
					<Row style={stylesHome.rowIcon}>
						{/* <Button
								style={styles.buttonPrimary}
								onPress={() =>
									this.props.navigation.navigate('Camera', { Id: 'myparams' })
								}>
								LAUNCH CAMERA
							</Button> */}
						<ButtonMenu text={'Ambil Gambar'}>
							<CameraSvg />
						</ButtonMenu>
						<ButtonMenu text={'Pilih Gambar'}>
							<CameraSvg />
						</ButtonMenu>
						<ButtonMenu text={'Pilih Gambar'}>
							<CameraSvg />
						</ButtonMenu>
						<ButtonMenu text={'Pilih Gambar'}>
							<CameraSvg />
						</ButtonMenu>
					</Row>
				</Grid>
			</Container>
		);
	}
}

const stylesHome = StyleSheet.create({
	rowBackground: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.PRIMARY_DARK,
	},
	viewBackground: {
		width: '100%',
		height: '100%',
		backgroundColor: colors.PRIMARY_LIGHT,
	},
	rowIcon: {
		backgroundColor: colors.PRIMARY_LIGHT,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		flex: 3,
		flexWrap: 'wrap',
	},
});
