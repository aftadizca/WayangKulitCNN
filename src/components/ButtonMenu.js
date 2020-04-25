import React from 'react';
import { TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, FONTS, ICONS } from '../config';

function ButtonMenu(props) {
	return (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple(COLORS.PRIMARY, false)}
			useForeground={true}
			onPress={props.onPress}>
			<LinearGradient colors={COLORS.GRADIENT} useAngle={true} angle={180} style={styles.viewMenu}>
				<View style={styles.iconView}>{props.icon}</View>
				<View style={{ flex: 2 }}>
					<Text style={styles.textPrimary}>{props.text}</Text>
					<Text style={styles.textSecondary}>{props.caption}</Text>
				</View>
				<Icon
					name={ICONS.ARROW_RIGHT.name}
					type={ICONS.ARROW_RIGHT.type}
					style={styles.icon}
				/>
			</LinearGradient>
		</TouchableNativeFeedback>
	);
}

ButtonMenu.propTypes = {
	text: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired,
	onPress: PropTypes.func,
	icon: PropTypes.element.isRequired
};

const styles = StyleSheet.create({
	viewMenu: {
		height: 100,
		padding: 15,
		margin: 10,
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: 20,
		borderColor: COLORS.PRIMARY_DARK,
		overflow: 'hidden',
		elevation: 5,
		borderWidth: 1,
		backgroundColor: COLORS.PRIMARY_DARK
	},
	iconView: {
		width: 72,
		height: 72,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textPrimary: {
		fontFamily: FONTS.BOLD,
		color: 'white',
		textAlign: 'left',
		marginLeft: 15,
		fontSize: 18
	},
	textSecondary: {
		fontFamily: FONTS.CONDENSED,
		color: 'white',
		opacity: 0.8,
		textAlign: 'left',
		marginLeft: 15,
		fontSize: 15
	},
	icon: {
		color: 'white',
		fontSize: 24
	},
});

export default ButtonMenu;
