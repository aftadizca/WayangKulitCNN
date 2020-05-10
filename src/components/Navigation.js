import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'native-base';
import { COLORS, ICONS } from '../config';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default function Navigation(props) {
	const { navigation } = props;
	const [opacity, setOpacity] = useState(0.1);

	function handleOpacity(bool) {
		if (bool) {
			setOpacity(1);
		} else {
			setOpacity(0.1);
		}
	}

	return (
		<View
			style={{
				position: 'absolute',
				top: widthPercentageToDP('2%'),
				left: widthPercentageToDP('2%'),
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
						style={{
							color: COLORS.PRIMARY_LIGHT,
							fontSize: 32,
							marginLeft: 6,
							marginRight: 6,
						}}
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
						style={{ color: COLORS.PRIMARY_LIGHT, fontSize: 100 }}
						{...ICONS.NAVIGATION_HOME}
					/>
				</Button>
			)}
		</View>
	);
}
