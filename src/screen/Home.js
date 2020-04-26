import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from 'react-native-text';
import { COLORS, FONTS } from '../config';
import { Container } from 'native-base';
import { ButtonMenu } from '../components';
import { Row, Grid, Col } from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';
//icon
import { BgSvg, GallerySvg, WayangSvg, CameraSvg, InfoSvg } from '../icon';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	openImagePicker = () => {
		const options = {
			title: 'Pilih Gambar Wayang',
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
				<Grid>
					<Row style={styles.rowTop}>
						<Col
							style={{
								justifyContent: 'center',
								alignItems: 'flex-end',
							}}>
							<Text style={styles.headerTitle}>SIDANGKU</Text>
							<Text style={styles.headerSubtitle}>
								Sistem Identifikasi Wayang Kulit
							</Text>
						</Col>
						<Col>
							<WayangSvg />
						</Col>
					</Row>
					<Row style={styles.rowBackground}>
						<View style={styles.viewBackground}>
							<BgSvg />
						</View>
					</Row>
					<Row style={styles.rowMenu}>
						<ButtonMenu
							text='AMBIL GAMBAR'
							caption='Ambil gambar menggunakan camera'
							icon={<CameraSvg />}
							onPress={() =>
								this.props.navigation.navigate('Camera', { Id: 'myparams' })
							}
						/>
						<ButtonMenu
							text={'PILIH GAMBAR'}
							icon={<GallerySvg />}
							caption='Pilih gambar dari gallery'
							onPress={this.openImagePicker}
						/>
						<ButtonMenu
							text={'TENTANG'}
							icon={<InfoSvg />}
							caption='Informasi tentang aplikasi'
							onPress={() => this.props.navigation.navigate('About')}
						/>
					</Row>
				</Grid>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	headerTitle: {
		fontFamily: FONTS.BOLD,
		fontSize: 28,
		color: COLORS.PRIMARY_LIGHT,
		textAlign: 'right',
	},
	headerSubtitle: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 18,
		color: COLORS.PRIMARY_LIGHT,
		textAlign: 'right',
	},
	headerHome: {
		backgroundColor: COLORS.PRIMARY_DARK,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	rowTop: {
		backgroundColor: COLORS.PRIMARY_DARK,
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingRight: widthPercentageToDP('8%'),
		paddingLeft: widthPercentageToDP('8%'),
		paddingTop: widthPercentageToDP('8%'),
	},
	rowBackground: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	rowMenu: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		alignContent: 'center',
		flex: 4,
		flexDirection: 'column',
		paddingTop: widthPercentageToDP('10%'),
		paddingBottom: widthPercentageToDP('10%'),
	},
	viewBackground: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
});
