import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from 'react-native-text'
import PropTypes from 'prop-types';
import { COLORS, FONTS } from '../config';
import LinearGradient from 'react-native-linear-gradient';

const ProgressBar = (props) => {
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
						...styles.insideBar,
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

const styles = StyleSheet.create({
	container: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 28,
		color: COLORS.PRIMARY_DARK,
		marginBottom: 5,
	},
	outerBar: {
		height: 20,
		width: '100%',
		borderRadius: 10,
		overflow: 'hidden',
	},
	insideBar: {
		height: '100%',
		borderRadius: 10,
	},
	textSubtitle: {
		fontFamily: FONTS.CONDENSED,
		fontWeight: '100',
		fontSize: 50,
		marginTop: -5,
		marginBottom: -10,
		color: COLORS.PRIMARY_DARK,
	},
	textSubtitle2: {
		fontFamily: FONTS.CONDENSED,
		opacity: 0.7,
		fontSize: 16,
		color: COLORS.PRIMARY_DARK,
	},
});

export default ProgressBar;
