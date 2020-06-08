import { StyleSheet, StatusBar } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { COLORS, FONTS } from '../config';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.BG,
	},
	image: {
		width: '100%',
		height: '100%',
		marginTop: StatusBar.currentHeight,
		backgroundColor: COLORS.BG,
	},
	modal: {
		justifyContent: 'flex-end',
		margin: 0,
	},

	renderContent: {
		padding: widthPercentageToDP('5%'),
		backgroundColor: COLORS.PRIMARY_LIGHT,
		borderWidth: 0,
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
