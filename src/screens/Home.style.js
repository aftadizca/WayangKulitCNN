import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../config';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
	headerTitle: {
		fontFamily: FONTS.BOLD,
		fontSize: 28,
		color: COLORS.PRIMARY_LIGHT,
		textAlign: 'right',
	},
	headerSubtitle: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 18,
		color: COLORS.PRIMARY_LIGHT,
		textAlign: 'right',
	},
	headerHome: {
		backgroundColor: COLORS.PRIMARY_DARK,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	rowTop: {
		backgroundColor: COLORS.PRIMARY_DARK,
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingRight: widthPercentageToDP('8%'),
		paddingLeft: widthPercentageToDP('8%'),
		paddingTop: widthPercentageToDP('8%'),
	},
	rowTopCol: {
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	rowBackground: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	rowMenu: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
		justifyContent: 'space-around',
		alignItems: 'center',
		alignContent: 'center',
		flex: 4,
		flexDirection: 'column',
		paddingTop: widthPercentageToDP('10%'),
		paddingBottom: widthPercentageToDP('10%'),
	},
	viewBackground: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
});
