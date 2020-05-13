import { StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { COLORS, FONTS } from '../config';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	modal: {
		justifyContent: 'flex-end',
		margin: 0,
	},

	renderContent: {
		padding: widthPercentageToDP('5%'),
		backgroundColor: COLORS.PRIMARY_LIGHT,
		borderWidth: 1,
		alignItems: 'center',
	},
	title: {
		fontFamily: FONTS.BOLD,
		fontSize: 28,
		color: COLORS.PRIMARY_DARK,
	},
	bodyText: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
	},
});
