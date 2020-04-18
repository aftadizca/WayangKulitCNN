import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../config';
import { Container, Header, Body, Title } from 'native-base';
import { ButtonMenu } from '../components';
import { Row, Grid } from 'react-native-easy-grid';
//icon
import BG from '../icon/bg2.svg';
import CameraSvg from '../icon/camera.svg';
import FolderSvg from '../icon/folder.svg';
import InfoSvg from '../icon/survey.svg';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}



	render() {
		return (
			<Container>
				<Header
					androidStatusBarColor={COLORS.PRIMARY_DARK}
					noLeft
					style={styles.headerHome}>
					<Body>
						<Title style={styles.headerTitle}>SIDANGKU</Title>
					</Body>
				</Header>
				<Grid>
					<Row style={styles.rowBackground}>
						<View style={styles.viewBackground}>
							<BG />
						</View>
					</Row>
					<Row style={styles.rowIcon}>
						<ButtonMenu
							text={'AMBIL GAMBAR'}
							onPress={() =>
								this.props.navigation.navigate('Camera', { Id: 'myparams' })
							}>
							<CameraSvg />
						</ButtonMenu>
						<ButtonMenu text={'PILIH GAMBAR'}>
							<FolderSvg />
						</ButtonMenu>
						<ButtonMenu text={'TENTANG'}>
							<InfoSvg />
						</ButtonMenu>
					</Row>
				</Grid>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	headerTitle: {
		fontFamily: FONTS.BOLD,
		fontSize: 24
	},
	headerHome: {
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	rowBackground: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	viewBackground: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
	rowIcon: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		flex: 3,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
});
