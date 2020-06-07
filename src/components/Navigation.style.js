import { widthPercentageToDP } from 'react-native-responsive-screen';

import { StyleSheet } from 'react-native';
import { COLORS } from '../config';

export const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: widthPercentageToDP('2%'),
		left: widthPercentageToDP('2%'),
		zIndex: 100,
		flexDirection: 'row',
	},
	icon: {
		color: COLORS.PRIMARY_DARK,
		fontSize: 32,
		marginLeft: 6,
		marginRight: 6,
	},
});
