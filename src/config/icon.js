
import { RNCamera } from 'react-native-camera';

const typeIcon = 'MaterialCommunityIcons';

export default ICON = {
    FLASH_ICON: {
        [RNCamera.Constants.FlashMode.on]: 'flash',
        [RNCamera.Constants.FlashMode.off]: 'flash-off',
        [RNCamera.Constants.FlashMode.auto]: 'flash-auto',
        type: typeIcon
    },
    ARROW_RIGHT: {
        name: 'chevron-right',
        type: typeIcon
    },
    CAPTURE_ICON: {
        name: 'camera-iris',
        type: typeIcon
    },
    APP_VERSION: {
        name: 'google-play',
        type: typeIcon
    },
    CNN_VERSION: {
        name: 'brain',
        type: typeIcon
    },
    UPDATE: {
        name: 'update',
        type: typeIcon
    },
    CLIPBOARD: {
        name: 'clipboard',
        type: typeIcon
    },
    ARROW_LEFT_CYCLE: {
        name: 'arrow-left-circle',
        type: typeIcon
    },
    ARROW_RIGHT_CYCLE: {
        name: 'arrow-right-circle',
        type: typeIcon
    }
};