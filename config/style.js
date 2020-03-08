import { StyleSheet } from 'react-native';

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
		on: 'flashlight',
		off: 'flashlight-off',
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
		fontFamily: fonts.BOLD
	},
	// Header
	headerHome: {
		backgroundColor: colors.PRIMARY_DARK
	},
	headerTitle: {
		fontFamily: fonts.EXTRABOLD
	}
});
