import React from 'react';
import { View } from 'react-native';
import Text from 'react-native-text';
import PropTypes from 'prop-types';
import { COLORS } from '../config';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './ProgressBar.style';

const ProgressBar = props => {
	return (
		<View style={{ ...styles.container, ...props.style }}>
			<Text style={styles.text}>{props.text.toUpperCase()}</Text>
			<LinearGradient
				colors={COLORS.GRADIENT2}
				useAngle={true}
				angle={360}
				style={styles.outerBar}>
				<LinearGradient
					colors={COLORS.GRADIENT}
					useAngle={true}
					angle={180}
					style={{
						...styles.innerBar,
						width: precise(props.value) + '%',
					}}
				/>
			</LinearGradient>
			<Text style={styles.textSubtitle}>{precise(props.value)}%</Text>
			<Text style={styles.textSubtitle2}>CONFIDENCE</Text>
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
};

export default ProgressBar;
