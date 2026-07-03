import { Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';

const isAndroid13OrAbove =
  Platform.OS === 'android' && Platform.Version >= 33;

export const MEDIA_PERMISSIONS = isAndroid13OrAbove
  ? [
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    ]
  : [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];