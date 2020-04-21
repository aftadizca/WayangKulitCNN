import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import Avatar from '../icon/avatar.jpg';
import { COLORS, FONTS, ICONS } from '../config';
import { version } from '../../package.json';

export class About extends Component {
	render() {
		return (
			<Grid>
				<Row size={40} style={styles.rOne}>
					<Image
						source={Avatar}
						resizeMethod='resize'
						resizeMode='stretch'
						style={styles.image}
					/>
					<View>
						<Text style={styles.nameText}>Afta Dizca Wahana</Text>
						<Text style={styles.text}>Teknik Informatika</Text>
						<Text style={styles.text}>UMAHA</Text>
					</View>
				</Row>
				<Row size={60} style={styles.rTwo}>
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
				height: 100,
			}}>
			<Grid>
				<Col
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						width: 100,
					}}>
					<Icon
						name={icon.name}
						type={icon.type}
						style={{ fontSize: 50, color: COLORS.PRIMARY_LIGHT }}
					/>
				</Col>
				<Col
					style={{
						justifyContent: 'center',
					}}>
					<Text style={styles.nameText}>{title}</Text>
					<Text style={styles.text}>{desc}</Text>
				</Col>
			</Grid>
		</View>
	);
}

const styles = StyleSheet.create({
	rOne: {
		backgroundColor: COLORS.PRIMARY_DARK,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	rTwo: {
		backgroundColor: COLORS.PRIMARY_DARK,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'column',
	},
	nameText: {
		fontFamily: FONTS.BOLD,
		marginBottom: 5,
		fontSize: 24,
		color: COLORS.PRIMARY_LIGHT,
	},
	text: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 20,
		color: COLORS.PRIMARY_LIGHT,
		opacity: 0.5,
	},
	image: {
		height: 150,
		width: 150,
		borderRadius: 125,
	},
});

export default About;
