import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { COLORS, FONTS } from '../config';

function MyButton(props) {
	return (
		<Button {...props} style={styles.button} rounded>
			<Text uppercase={false} style={styles.text}>
				{props.children}
			</Text>
		</Button>
	);
}

export default MyButton;

const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.PRIMARY_DARK,
	},
	text: {
		fontFamily: FONTS.TITLE,
		fontSize: 16,
	},
});
