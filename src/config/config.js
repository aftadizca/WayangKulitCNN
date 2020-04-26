import {
    TransitionPresets
} from '@react-navigation/stack';

export const screenOptions = {
    headerMode: 'none',
    gestureDirection: 'horizontal',
    headerShown: false,
    ...TransitionPresets.SlideFromRightIOS
};

export const DEFAULT_RATIO = "16:9"