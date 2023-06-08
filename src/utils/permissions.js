import {Platform, PermissionsAndroid} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const getStoragePermissions = async () => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    console.log('Permissions Granted');
    return;
  } else {
    console.log('Permissions Not Granted');
  }
};

const hasAndroidPermission = async () => {
  const permission =
    // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE &&
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES &&
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
};

export const checkAndroidPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    const granted = await PermissionsAndroid.requestMultiple([
      'android.permission.CAMERA',
      'android.permission.WRITE_EXTERNAL_STORAGE',
    ]);
    if (
      granted['android.permission.CAMERA'] !== 'granted' ||
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted'
    ) {
      throw new Error('Required permission not granted');
    }
  }
};

export const checkAndroidPermissionCameraRoll = async () => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    const granted = await PermissionsAndroid.requestMultiple([
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.READ_EXTERNAL_STORAGE',
    ]);
    if (
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
      granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
    ) {
      throw new Error('Required permission not granted');
    }
  }
};

export const askForImagePermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
  console.log('read images', result);
};

export const askForExternalStoragePermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  console.log('external storage', result);
};
export const askForCameraPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.CAMERA);
  console.log('camera', result);
};

export const askForContactsPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
  console.log('contacts', result);
};
