import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'native-base';
import { COLORS, ICONS } from '../config';

export default function Navigation(props) {
	const { navigation } = props;
	const [opacity, setOpacity] = useState(0.3);

	function handleOpacity(bool) {
		if (bool) {
			setOpacity(1);
		} else {
			setOpacity(0.3);
		}
	}

	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 100,
				flexDirection: 'row',
			}}>
			{props.back && (
				<Button
					rounded
					transparent
					onPress={() => navigation.goBack()}
					onPressIn={() => handleOpacity(true)}
					onPressOut={() => handleOpacity(false)}
					style={{ opacity: opacity }}>
					<Icon
						style={{ color: COLORS.PRIMARY_LIGHT }}
						{...ICONS.NAVIGATION_BACK}
					/>
				</Button>
			)}
			{props.home && (
				<Button
					rounded
					transparent
					onPress={() => navigation.popToTop()}
					onPressIn={() => handleOpacity(true)}
					onPressOut={() => handleOpacity(false)}
					style={{ opacity: opacity, marginLeft: props.back ? -15 : 0 }}>
					<Icon
						style={{ color: COLORS.PRIMARY_LIGHT }}
						{...ICONS.NAVIGATION_HOME}
					/>
				</Button>
			)}
		</View>
	);
}
