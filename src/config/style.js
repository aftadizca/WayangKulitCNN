import { StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

export const colors = {
	PRIMARY: '#8d6e63',
	PRIMARY_DARK: '#5f4339',
	PRIMARY_LIGHT: '#be9c91',
	SECONDARY: '#3e2723',
	SECONDARY_DARK: '#1b0000',
	SECONDARY_LIGHT: '#6a4f4b',
	CAMERA_FOCUS_BOX: '#11fc29'
};

export const fonts = {
	BOLD: 'RobotoSlab-Bold',
	EXTRABOLD: 'RobotoSlab-ExtraBold',
	REGULAR: 'RobotoSlab-Regular',
	LIGHT: 'RobotoSlab-Light'
};

export const icons = {
	FLASH_ICON: {
		[RNCamera.Constants.FlashMode.on]: 'flash',
		[RNCamera.Constants.FlashMode.off]: 'flash-off',
		[RNCamera.Constants.FlashMode.auto]: 'flash-auto',
		type: 'MaterialCommunityIcons'
	}
};

export const styles = StyleSheet.create({
	//Button
	buttonPrimary: {
		backgroundColor: colors.PRIMARY,
		borderColor: colors.PRIMARY_DARK,
		borderWidth: 1
	},
	buttonPrimaryText: {
		fontFamily: fonts.EXTRABOLD
	},
	// Header
	headerHome: {
		backgroundColor: colors.PRIMARY_DARK
	},
	headerTitle: {
		fontFamily: fonts.EXTRABOLD
	}
});
