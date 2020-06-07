import { heightPercentageToDP } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../config';

export const styles = StyleSheet.create({
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
		height: heightPercentageToDP('2.5%'),
		width: '100%',
		borderRadius: 10,
		overflow: 'hidden',
	},
	innerBar: {
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
