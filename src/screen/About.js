import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import Text, { useScaleText } from 'react-native-text';
import { Grid, Row, Col } from 'react-native-easy-grid';
import Avatar from '../icon/avatar.jpg';
import { COLORS, FONTS, ICONS } from '../config';
import { version } from '../../package.json';
import BG from '../icon/bg2.svg';

export class About extends Component {
	render() {
		return (
			<Grid>
				<Row size={2} style={styles.rOne}>
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
						<Text style={styles.text}>Teknik Informatika</Text>
						<Text style={styles.text}>UMAHA</Text>
					</Col>
				</Row>
				<Row size={2} style={styles.rTwo}>
					<View style={styles.viewBackground}>
						<BG />
					</View>
				</Row>
				<Row size={3} style={styles.rThree}>
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
				</Row>
			</Grid>
		);
	}
}

function AboutList(props) {
	const { icon, title, desc } = props.data;
	return (
		<View
			style={{
				width: '70%',
				height: 80,
				padding: 5,
			}}>
			<Grid>
				<Col
					style={{
						justifyContent: 'center',
						alignItems: 'flex-end',
						width: '35%',
						borderRightWidth: 3,
						paddingRight: 10,
					}}>
					<Icon
						name={icon.name}
						type={icon.type}
						style={{
							fontSize: useScaleText({ fontSize: 35 }).fontSize,
							color: COLORS.PRIMARY_DARK,
						}}
					/>
				</Col>
				<Col
					style={{
						justifyContent: 'center',
						paddingLeft: 10,
					}}>
					<Text style={styles.listPrimaryText}>{title}</Text>
					<Text style={styles.listSecondaryText}>{desc}</Text>
				</Col>
			</Grid>
		</View>
	);
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	rOne: {
		backgroundColor: COLORS.PRIMARY_DARK,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rTwo: {
		backgroundColor: COLORS.PRIMARY_DARK,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'column',
	},
	rThree: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'column',
	},
	nameText: {
		fontFamily: FONTS.BOLD,
		marginBottom: 5,
		fontSize: 18,
		color: COLORS.PRIMARY_LIGHT,
	},
	text: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 16,
		color: COLORS.PRIMARY_LIGHT,
		opacity: 0.5,
	},
	listPrimaryText: {
		fontFamily: FONTS.BOLD,
		marginBottom: 5,
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
		height: windowWidth * 0.35,
		width: windowWidth * 0.35,
		borderRadius: windowWidth * 0.7,
	},
	viewBackground: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
});

export default About;
