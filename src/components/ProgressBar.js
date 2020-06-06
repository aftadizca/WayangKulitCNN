import React from 'react';
import { View } from 'react-native';
import Text from 'react-native-text';
import PropTypes from 'prop-types';
import { COLORS } from '../config';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './ProgressBar.style';

const ProgressBar = ({
	style,
	text,
	value,
	enableSubText = true,
	subText = 'CONFIDENCE',
}) => {
	return (
		<View style={{ ...styles.container, ...style }}>
			<LinearGradient
				colors={COLORS.GRADIENT}
				useAngle={true}
				angle={90}
				style={styles.linearGradienText}
			>
				<Text style={styles.text}>{text.toUpperCase()}</Text>
			</LinearGradient>
			<LinearGradient
				colors={COLORS.GRADIENT}
				useAngle={true}
				angle={90}
				style={styles.linearGradienText}
			>
				<Text style={styles.textSubtitle}>{precise(value)}%</Text>
				{enableSubText && <Text style={styles.textSubtitle2}>{subText}</Text>}
			</LinearGradient>
		</View>
	);
};

function precise(x) {
	return Number.parseFloat(x * 100).toPrecision(3);
}

ProgressBar.propTypes = {
	text: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	style: PropTypes.object,
	subText: PropTypes.string,
	enableSubText: PropTypes.bool,
};

export default ProgressBar;
