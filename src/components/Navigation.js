import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'native-base';
import { ICONS } from '../config';
import { styles } from './Navigation.style';

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
		<View style={styles.container}>
			<Button
				rounded
				transparent
				onPress={() => navigation.goBack()}
				onPressIn={() => handleOpacity(true)}
				onPressOut={() => handleOpacity(false)}
				style={{ opacity: opacity }}>
				<Icon style={styles.icon} {...ICONS.NAVIGATION_BACK} />
			</Button>
		</View>
	);
}
