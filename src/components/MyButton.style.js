import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../config';

export const styles = StyleSheet.create({
	button: {
		paddingTop: 12,
		paddingBottom: 12,
		margin: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 50,
		backgroundColor: COLORS.PRIMARY_DARK,
		overflow: 'hidden',
		elevation: 5,
		borderColor: COLORS.PRIMARY_DARK,
		borderWidth: 0.7,
	},
	text: {
		fontFamily: FONTS.BOLD,
		fontSize: 14,
		color: COLORS.PRIMARY_DARK,
	},
});
