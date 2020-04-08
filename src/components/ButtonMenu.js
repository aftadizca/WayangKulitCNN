import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { colors, styles } from 'config';

function ButtonMenu(props) {
	return (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple(colors.PRIMARY_DARK, false)}
			useForeground={true}
			onPress={props.onPress}>
			<View
				style={{
					height: 128,
					padding: 15,
					width: 128,
					margin: 10,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 8,
					overflow: 'hidden',
				}}>
				{props.children}
				<Text
					style={{
						...styles.buttonPrimaryText,
						color: colors.PRIMARY_DARK,
						textAlign: 'center',
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
