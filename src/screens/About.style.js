import { StyleSheet } from 'react-native';
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';
import { COLORS, FONTS } from '../config';

export const listStyles = StyleSheet.create({
	container: {
		width: '80%',
		marginBottom: heightPercentageToDP('2%'),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: heightPercentageToDP('10%'),
		backgroundColor: COLORS.BG,
		borderRadius: widthPercentageToDP('50%'),
		elevation: 10,
	},
	iconLeft: {
		color: COLORS.PRIMARY_DARK,
	},
	left: {
		width: '25%',
		alignItems: 'center',
	},
	center: { width: '50%' },
	centerTextTop: {
		fontFamily: FONTS.REGULAR,
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
	},
	centerTextBottom: {
		fontFamily: FONTS.LIGHT,
		fontSize: 16,
		opacity: 0.7,
		color: COLORS.PRIMARY_DARK,
	},
	right: {
		width: '25%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightIconView: { borderRadius: 100, padding: 8, overflow: 'hidden' },
	rightIcon: {
		color: COLORS.PRIMARY_DARK,
		marginLeft: 0,
		marginRight: 0,
	},
});

export const styles = StyleSheet.create({
	rOne: {
		backgroundColor: COLORS.BG,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		flex: 3,
	},
	rOneCol: {
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rOneColView: {
		height: widthPercentageToDP('35%'),
		width: widthPercentageToDP('35%'),
		borderWidth: 3,
		overflow: 'hidden',
		borderColor: COLORS.PRIMARY_DARK,
		borderRadius: widthPercentageToDP('17.5%'),
	},
	rOneColViewImg: {
		height: widthPercentageToDP('35%'),
		width: widthPercentageToDP('35%'),
	},
	rThree: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'column',
		paddingTop: heightPercentageToDP('8%'),
	},
	nameText: {
		fontFamily: FONTS.BOLD,
		marginBottom: heightPercentageToDP('0.5%'),
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
	},
	nameSubText: {
		fontFamily: FONTS.REGULAR,
		fontSize: 16,
		color: COLORS.PRIMARY_DARK,
		opacity: 0.5,
	},
	listPrimaryText: {
		fontFamily: FONTS.BOLD,
		marginBottom: heightPercentageToDP('0.5%'),
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
	},
	listSecondaryText: {
		fontFamily: FONTS.CONDENSED,
		fontSize: 18,
		color: COLORS.PRIMARY_DARK,
		opacity: 0.7,
	},
	viewBackground: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.PRIMARY_LIGHT,
	},
});

export const modalStyles = StyleSheet.create({
	modalView: {
		padding: widthPercentageToDP('4%'),
		justifyContent: 'center',
		alignItems: 'center',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	text: {
		fontFamily: FONTS.BOLD,
		fontSize: 16,
		color: COLORS.PRIMARY_DARK,
	},
	textItalic: {
		fontFamily: FONTS.BOLD_ITALIC,
		fontSize: 16,
		color: COLORS.PRIMARY_DARK,
	},
	textButton: {
		fontFamily: FONTS.BOLD,
		fontSize: 16,
		color: COLORS.PRIMARY_DARK,
	},
	icon: { fontSize: 128, color: COLORS.PRIMARY_DARK },
	buttonContainer: {
		backgroundColor: COLORS.PRIMARY_LIGHT,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		padding: widthPercentageToDP('4%'),
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	button: {
		backgroundColor: COLORS.BG,
		width: '30%',
		justifyContent: 'center',
	},
});
