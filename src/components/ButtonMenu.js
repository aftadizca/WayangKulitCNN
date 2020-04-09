import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { colors, styles } from 'config';

function ButtonMenu(props) {
	return (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple(colors.SECONDARY_DARK, false)}
			useForeground={true}
			onPress={props.onPress}>
			<View
				style={{
					height: 150,
					padding: 15,
					width: 128,
					margin: 20,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					borderRadius: 8,
					overflow: 'hidden',
				}}>
				{props.children}
				<Text
					style={{
						...styles.buttonPrimaryText,
						color: colors.PRIMARY_DARK,
						textAlign: 'center',
						fontSize: 18,
					}}>
					{props.text}
				</Text>
			</View>
		</TouchableNativeFeedback>
	);
}

ButtonMenu.propTypes = {
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func,
};

export default ButtonMenu;
