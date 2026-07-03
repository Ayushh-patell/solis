import {
  checkMultiple,
  requestMultiple,
  openSettings,
  RESULTS,
} from 'react-native-permissions';

import { MEDIA_PERMISSIONS } from './permission';
import { PERMISSION_STATUS } from './PermissionStatus';

class PermissionService {
  async checkMediaPermission() {
    const statuses = await checkMultiple(MEDIA_PERMISSIONS);

    return this.#getOverallStatus(statuses);
  }

  async requestMediaPermission() {
    const statuses = await requestMultiple(MEDIA_PERMISSIONS);

    return this.#getOverallStatus(statuses);
  }

  async openAppSettings() {
    return openSettings();
  }

  #getOverallStatus(statuses) {
    const values = Object.values(statuses);

    if (values.every(status => status === RESULTS.GRANTED)) {
      return PERMISSION_STATUS.GRANTED;
    }

    if (values.some(status => status === RESULTS.BLOCKED)) {
      return PERMISSION_STATUS.BLOCKED;
    }

    if (values.some(status => status === RESULTS.DENIED)) {
      return PERMISSION_STATUS.DENIED;
    }

    if (values.some(status => status === RESULTS.LIMITED)) {
      return PERMISSION_STATUS.LIMITED;
    }

    if (values.some(status => status === RESULTS.UNAVAILABLE)) {
      return PERMISSION_STATUS.UNAVAILABLE;
    }

    return PERMISSION_STATUS.DENIED;
  }
}

export default new PermissionService();