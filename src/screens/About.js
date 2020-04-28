import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import Text, { useScaleText } from 'react-native-text';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { COLORS, FONTS, ICONS } from '../config';
import { version } from '../../package.json';
import { MyButton } from '../components';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
	Container,
	Header,
	Content,
	Button,
	ListItem,
	Icon,
	Left,
	Body,
	Right,
	Switch,
} from 'native-base';
import Avatar from '../icon/avatar.jpg';
import BG from '../icon/bg2.svg';

export class About extends Component {
	render() {
		return (
			<Grid>
				<StatusBar backgroundColor={COLORS.PRIMARY_DARK} />
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
						title='Versi Aplikasi'
						desc={version}
						iconLeft={ICONS.APP_VERSION}
					/>
					<AboutList
						title='Versi Model CNN'
						desc={'1.0'}
						iconRight={ICONS.UPDATE}
						iconLeft={ICONS.CNN_VERSION}
					/>
				</Row>
			</Grid>
		);
	}
}

function AboutList(props) {
	const { iconLeft, iconRight, title, desc } = props;
	return (
		<ListItem
			icon
			style={{
				width: '70%',
				marginBottom: 10,
			}}>
			<Left
				style={{
					width: '17%',
					justifyContent: 'center',
					alignItems: 'center',
					paddingRight: 0,
				}}>
				<Icon
					style={{
						fontSize: useScaleText({ fontSize: 30 }).fontSize,
						color: COLORS.PRIMARY_DARK,
						height: '100%',
						width: '100%',
					}}
					{...iconLeft}
				/>
			</Left>
			<Body style={{ borderBottomWidth: 0 }}>
				<Text style={styles.listPrimaryText}>{title}</Text>
				<Text style={styles.listSecondaryText}>{desc}</Text>
			</Body>
			<Right style={{ borderBottomWidth: 0 }}>
				{iconRight && (
					<Button
						rounded
						small
						style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
						<Icon active {...iconRight} />
					</Button>
				)}
			</Right>
		</ListItem>
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
