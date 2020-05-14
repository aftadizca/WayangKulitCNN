import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from './src/config';

export const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.PRIMARY_DARK,
		flexDirection: 'column',
	},
	textView: { alignItems: 'center' },
	downloadText: {
		fontFamily: FONTS.BOLD,
		color: COLORS.PRIMARY_LIGHT,
		fontSize: 18,
		marginBottom: 10,
	},
	progressText: {
		fontFamily: FONTS.CONDENSED,
		color: COLORS.PRIMARY_LIGHT,
		fontSize: 60,
	},
	imageView: { width: '40%', height: '30%' },
});
