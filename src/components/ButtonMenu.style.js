import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen';

import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../config';

export const styles = StyleSheet.create({
	viewMenu: {
		maxHeight: heightPercentageToDP('25%'),
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		borderRadius: widthPercentageToDP('50%'),
		borderColor: COLORS.PRIMARY_DARK,
		overflow: 'hidden',
		elevation: 10,
		borderWidth: 1,
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	iconView: {
		width: '46%',
		height: '46%',
		flex: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},

	textView: { flex: 55 },
	icon: {
		flex: 15,
		color: COLORS.PRIMARY_DARK,
		fontSize: 24,
	},
	textPrimary: {
		fontFamily: FONTS.BOLD,
		color: COLORS.PRIMARY_DARK,
		textAlign: 'left',
		fontSize: 16,
	},
	textSecondary: {
		fontFamily: FONTS.CONDENSED,
		color: COLORS.PRIMARY_DARK,
		textAlign: 'left',
		fontSize: 14,
	},
});
