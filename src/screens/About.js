import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { MyButton } from '../components';
import Text, { useScaleText } from 'react-native-text';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { COLORS, FONTS, ICONS } from '../config';
import { version } from '../../package.json';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';

import Avatar from '../icon/avatar.jpg';
import BG from '../icon/bg2.svg';

export class About extends Component {
	render() {
		return (
			<Grid>
				<Row size={3} style={styles.rOne}>
					<Col
						style={{
							padding: 5,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Image
							source={Avatar}
							resizeMethod='resize'
							resizeMode='stretch'
							style={styles.image}
						/>
					</Col>
					<Col>
						<Text adjustsFontSizeToFit style={styles.nameText}>
							Afta Dizca Wahana
						</Text>
						<Text style={styles.nameSubText}>Teknik Informatika</Text>
						<Text style={styles.nameSubText}>UMAHA</Text>
					</Col>
				</Row>
				<Row size={2}>
					<View style={styles.viewBackground}>
						<BG />
					</View>
				</Row>
				<Row size={4} style={styles.rThree}>
					<AboutList
						data={{
							icon: ICONS.APP_VERSION,
							title: 'Versi Aplikasi',
							desc: version,
						}}
					/>
					<AboutList
						data={{
							icon: ICONS.CNN_VERSION,
							title: 'Versi Model CNN',
							desc: '1.0',
						}}
					/>
					<MyButton>Cek Update CNN Model</MyButton>
				</Row>
			</Grid>
		);
	}
}

function AboutList(props) {
	const { icon, title, desc } = props.data;
	return (
		<Row
			style={{
				width: '70%',
				maxHeight: heightPercentageToDP('10%'),
			}}>
			<Col
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					width: widthPercentageToDP('20%'),
				}}>
				<Icon
					name={icon.name}
					type={icon.type}
					style={{
						fontSize: useScaleText({ fontSize: 20 }).fontSize,
						color: COLORS.PRIMARY_LIGHT,
						backgroundColor: COLORS.PRIMARY_DARK,
						padding: widthPercentageToDP('4%'),
						borderRadius: widthPercentageToDP('8%'),
					}}
				/>
			</Col>
			<Col
				style={{
					justifyContent: 'center',
					marginLeft: widthPercentageToDP('3%'),
				}}>
				<Text style={styles.listPrimaryText}>{title}</Text>
				<Text style={styles.listSecondaryText}>{desc}</Text>
			</Col>
		</Row>
	);
}

const styles = StyleSheet.create({
	rOne: {
		backgroundColor: COLORS.PRIMARY_DARK,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rThree: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'column',
		paddingTop: heightPercentageToDP('8%'),
	},
	nameText: {
		fontFamily: FONTS.BOLD,
		marginBottom: heightPercentageToDP('0.5%'),
		fontSize: 18,
		color: COLORS.PRIMARY_LIGHT,
	},
	nameSubText: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 16,
		color: COLORS.PRIMARY_LIGHT,
		opacity: 0.5,
	},
	listPrimaryText: {
		fontFamily: FONTS.BOLD,
		marginBottom: heightPercentageToDP('0.5%'),
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
	},
	listSecondaryText: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
		opacity: 0.5,
	},
	image: {
		height: widthPercentageToDP('35%'),
		width: widthPercentageToDP('35%'),
		borderRadius: widthPercentageToDP('17.5%'),
	},
	viewBackground: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
});

export default About;
