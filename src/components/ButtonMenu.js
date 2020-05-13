import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { Icon } from 'native-base';
import Text from 'react-native-text';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ICONS } from '../config';
import { styles } from './ButtonMenu.style';

function ButtonMenu(props) {
	return (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple(COLORS.PRIMARY, false)}
			useForeground={true}
			onPress={props.onPress}>
			<LinearGradient
				colors={COLORS.GRADIENT}
				useAngle={true}
				angle={180}
				style={styles.viewMenu}>
				<View style={styles.iconView}>{props.icon}</View>
				<View style={styles.textView}>
					<Text style={styles.textPrimary}>{props.text}</Text>
					<Text style={styles.textSecondary}>{props.caption}</Text>
				</View>
				<Icon
					name={ICONS.ARROW_RIGHT.name}
					type={ICONS.ARROW_RIGHT.type}
					style={styles.icon}
				/>
			</LinearGradient>
		</TouchableNativeFeedback>
	);
}

ButtonMenu.propTypes = {
	text: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired,
	onPress: PropTypes.func,
	icon: PropTypes.element.isRequired,
};

export default ButtonMenu;
