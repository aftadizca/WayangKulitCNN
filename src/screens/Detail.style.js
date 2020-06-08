import { StyleSheet } from 'react-native';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';
import { COLORS, FONTS } from '../config';

export const styles = StyleSheet.create({
	headerContainer: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	headerImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
		width: '100%',
	},
	headerText: {
		color: COLORS.PRIMARY_DARK,
		fontFamily: FONTS.BOLD,
		fontSize: 30,
	},
	tabStyle: {
		backgroundColor: COLORS.TRANSPARENT,
		overflow: 'hidden',
	},
	activeTabTextStyle: {
		fontFamily: FONTS.BOLD,
		color: COLORS.PRIMARY_DARK,
		backgroundColor: COLORS.BG2,
		padding: widthPercentageToDP('1.5%'),
		paddingLeft: widthPercentageToDP('5%'),
		paddingRight: widthPercentageToDP('5%'),
		borderRadius: widthPercentageToDP('10%'),
		overflow: 'hidden',
	},
	tabTextStyle: { fontFamily: FONTS.BOLD, color: COLORS.PRIMARY_DARK },
	activeTabStyle: {
		backgroundColor: COLORS.TRANSPARENT,
	},
	tabContent: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
	cardHeader: {
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	cardItem: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
	textBody: {
		fontFamily: FONTS.REGULAR,
		color: '#000',
		fontSize: 18,
		textAlign: 'justify',
	},
	scrollView: {
		padding: widthPercentageToDP('7%'),
	},
	listItem: { borderBottomColor: COLORS.PRIMARY_DARK },
	listDivider: {
		backgroundColor: COLORS.BG2,
		borderRadius: widthPercentageToDP('10%'),
		marginTop: heightPercentageToDP('3%'),
	},
	listTextHeader: {
		fontFamily: FONTS.BOLD,
		color: COLORS.PRIMARY_DARK,
	},
	listTextPrimary: {
		fontFamily: FONTS.REGULAR,
		color: '#000',
		fontSize: 16,
	},
	listTextSecondary: {
		fontFamily: FONTS.REGULAR,
		color: COLORS.PRIMARY_DARK,
		fontSize: 16,
		opacity: 0.7,
	},
});
