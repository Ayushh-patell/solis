import { useCallback, useState } from 'react';

import {
  PermissionService,
  PERMISSION_STATUS,
} from '../services/permissions';

export function usePermission() {
  const [status, setStatus] = useState(PERMISSION_STATUS.UNKNOWN);
  const [loading, setLoading] = useState(false);

  const checkMediaPermission = useCallback(async () => {
    setLoading(true);

    try {
      const permissionStatus =
        await PermissionService.checkMediaPermission();

      setStatus(permissionStatus);

      return permissionStatus;
    } finally {
      setLoading(false);
    }
  }, []);

  const requestMediaPermission = useCallback(async () => {
    setLoading(true);

    try {
      const permissionStatus =
        await PermissionService.requestMediaPermission();

      setStatus(permissionStatus);

      return permissionStatus;
    } finally {
      setLoading(false);
    }
  }, []);

  const openSettings = useCallback(() => {
    return PermissionService.openAppSettings();
  }, []);

  return {
    status,
    loading,
    checkMediaPermission,
    requestMediaPermission,
    openSettings,
  };
}