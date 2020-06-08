import { TransitionPresets } from '@react-navigation/stack';

export const screenOptions = {
	headerMode: 'none',
	//gestureDirection: 'horizontal',
	headerShown: false,
	...TransitionPresets.FadeFromBottomAndroid,
	cardStyle: {
		backgroundColor: '#8D6E63',
		opacity: 0.99,
	},
};

export const DEFAULT_RATIO = '16:9';

export function pathJoin(parts, sep) {
	const separator = sep || '/';
	parts = parts.map((part, index) => {
		if (index) {
			part = part.replace(new RegExp('^' + separator), '');
		}
		if (index !== parts.length - 1) {
			part = part.replace(new RegExp(separator + '$'), '');
		}
		return part;
	});
	return parts.join(separator);
}
