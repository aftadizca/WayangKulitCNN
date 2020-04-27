import React from 'react';
import { TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import Text from 'react-native-text'
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, FONTS, ICONS } from '../config';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';

function ButtonMenu(props) {
	return (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple(COLORS.PRIMARY, false)}
			useForeground={true}
			onPress={props.onPress}>
			<LinearGradient colors={COLORS.GRADIENT} useAngle={true} angle={180} style={styles.viewMenu}>
				<View style={styles.iconView}>{props.icon}</View>
				<View style={styles.textView}>
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
		maxHeight: heightPercentageToDP('25%'),
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		borderRadius: widthPercentageToDP('50%'),
		borderColor: COLORS.PRIMARY_DARK,
		overflow: 'hidden',
		elevation: 10,
		borderWidth: 1,
		backgroundColor: COLORS.PRIMARY_DARK
	},
	iconView: {
		width: '40%',
		height: '40%',
		flex: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},

	textView: { flex: 55 },
	icon: {
		flex: 15,
		color: COLORS.PRIMARY_DARK,
		fontSize: 24
	},
	textPrimary: {
		fontFamily: FONTS.BOLD,
		color: COLORS.PRIMARY_DARK,
		textAlign: 'left',
		fontSize: 16
	},
	textSecondary: {
		fontFamily: FONTS.CONDENSED,
		color: COLORS.PRIMARY_DARK,
		textAlign: 'left',
		fontSize: 14
	},
});

export default ButtonMenu;
