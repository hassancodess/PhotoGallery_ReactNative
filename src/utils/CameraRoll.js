import {Platform, PermissionsAndroid} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export const getImages = async () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  let permissionResult = await request(permission);

  if (permissionResult !== RESULTS.GRANTED) return;

  if (Platform.OS === 'android' && Platform.Version >= 29) {
    permissionResult = await request(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION);
    if (permissionResult !== RESULTS.GRANTED) return;
  }

  if (Platform.OS === 'android') {
    const r = await PermissionsAndroid.request(PERMISSIONS.ANDROID.CAMERA);
  }

  const p = await CameraRoll.getPhotos({
    first: 10,
    groupTypes: 'All',
    assetType: 'Photos',
  });
  const photos = p.edges.map(x => x.node);
  return photos;
};
