import {
    TransitionSpecs,
    CardStyleInterpolators
} from '@react-navigation/stack';

export const screenOptions = {
    headerMode: 'none',
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    gestureDirection: 'horizontal',
    headerShown: false,
    transitionSpec: {
        open: TransitionSpecs.FadeInFromBottomAndroidSpec,
        close: TransitionSpecs.FadeOutToBottomAndroidSpec
    },
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
};

export const DEFAULT_RATIO = "16:9"