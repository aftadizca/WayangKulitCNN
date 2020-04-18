import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../config';
import { Container, Header, Body, Title } from 'native-base';
import { ButtonMenu } from '../components';
import { Row, Grid } from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
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

	openImagePicker = () => {
		const options = {
			title: 'Select Avatar',
			customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};
		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				this.props.navigation.navigate('Pic', { uri: response.path });
			}
		});
	};

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
							text='AMBIL GAMBAR'
							caption='Ambil gambar menggunakan camera'
							onPress={() =>
								this.props.navigation.navigate('Camera', { Id: 'myparams' })
							}>
							<CameraSvg />
						</ButtonMenu>
						<ButtonMenu
							text={'PILIH GAMBAR'}
							caption='Pilih gambar dari gallery'
							onPress={this.openImagePicker}>
							<FolderSvg />
						</ButtonMenu>
						<ButtonMenu text={'TENTANG'} caption='Informasi tentang aplikasi'>
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
		fontSize: 24,
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
