import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import Text from 'react-native-text';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../config';
import { styles } from './MyButton.style';

function MyButton(props) {
	return (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple(COLORS.PRIMARY, false)}
			useForeground={true}
			onPress={props.onPress}>
			<LinearGradient
				colors={COLORS.GRADIENT}
				useAngle={true}
				angle={180}
				style={styles.button}>
				<Text style={styles.text}>{props.children}</Text>
			</LinearGradient>
		</TouchableNativeFeedback>
	);
}

MyButton.propTypes = {
	onPress: PropTypes.func,
	children: PropTypes.string.isRequired,
};

export default MyButton;
