import React from 'react';
import { StyleSheet, TouchableNativeFeedback, Text } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, FONTS } from '../config';

function MyButton(props) {
	return (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple(COLORS.PRIMARY, false)}
			useForeground={true}
			onPress={props.onPress}>
			<LinearGradient colors={COLORS.GRADIENT} useAngle={true} angle={180} style={styles.button}>
				<Text style={styles.text}>{props.children}</Text>
			</LinearGradient>
		</TouchableNativeFeedback>
	);
}

MyButton.propTypes = {
	onPress: PropTypes.func,
	children: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
	button: {
		paddingTop: 12,
		paddingBottom: 12,
		margin: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 50,
		borderWidth: 1,
		backgroundColor: COLORS.PRIMARY_DARK,
		borderColor: COLORS.PRIMARY_DARK,
		overflow: 'hidden',
		elevation: 5

	},
	text: {
		fontFamily: FONTS.BOLD,
		fontSize: 16,
		color: 'white'
	},
});

export default MyButton;
