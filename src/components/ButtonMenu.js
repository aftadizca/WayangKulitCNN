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
			<LinearGradient colors={[COLORS.PRIMARY_LIGHT, COLORS.PRIMARY, COLORS.PRIMARY_DARK]} useAngle={true} angle={241} style={styles.viewMenu}>
				<View style={styles.iconView}>{props.children}</View>
				<Text style={styles.textPrimary}>{props.text}</Text>
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
	onPress: PropTypes.func,
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
		borderColor: COLORS.SECONDARY,
		overflow: 'hidden',
		elevation: 5
	},
	iconView: {
		width: 72,
		height: 72,
		flex: 1,
	},
	textPrimary: {
		fontFamily: FONTS.BOLD,
		color: COLORS.SECONDARY,
		textAlign: 'left',
		marginLeft: 15,
		fontSize: 16,
		flex: 2,
	},
	icon: {
		color: COLORS.SECONDARY,
		fontSize: 24,
	},
});

export default ButtonMenu;
