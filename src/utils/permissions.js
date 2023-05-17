import {Platform, PermissionsAndroid} from 'react-native';

export const getPermissions = async () => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    console.log('Permissions Granted');
    return;
  } else {
    console.log('Permissions Not Granted');
  }
};

const hasAndroidPermission = async () => {
  const permission =
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE &&
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
};
