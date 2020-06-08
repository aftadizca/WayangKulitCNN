import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { Button, Icon } from 'native-base';
import { ICONS, COLORS } from '../config';
import { styles } from './Navigation.style';

export default function Navigation(props) {
	const {
		defaultOpacity = 0.5,
		translucentStatusBar = true,
		icon_color = COLORS.PRIMARY_DARK,
	} = props;
	const [opacity, setOpacity] = useState(defaultOpacity);
	const statusBarHeight = StatusBar.currentHeight;
	function handleOpacity(bool) {
		if (bool) {
			setOpacity(1);
		} else {
			setOpacity(defaultOpacity);
		}
	}
	return (
		<View
			style={{
				...styles.container,
				marginTop: translucentStatusBar ? statusBarHeight : 0,
			}}
		>
			<Button
				rounded
				transparent
				onPress={() => props.goBack()}
				onPressIn={() => handleOpacity(true)}
				onPressOut={() => handleOpacity(false)}
				style={{ opacity: opacity }}
			>
				<Icon
					style={{ ...styles.icon, ...props.icon_color }}
					{...ICONS.NAVIGATION_BACK}
				/>
			</Button>
		</View>
	);
}
