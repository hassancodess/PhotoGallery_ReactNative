import {Platform, PermissionsAndroid} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

async function hasAndroidPermission() {
  const permission =
    Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export const getImages = async (value = 30) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    console.log('returned');
    return;
  }

  const p = await CameraRoll.getPhotos({
    first: value,
    // groupTypes: 'All',
    groupName: 'Pictures',
    assetType: 'Photos',
  });
  // console.log('await photos');
  const photos = p.edges.map(x => x.node);
  // console.log('photos', photos);
  return photos;
};

export const getImagesInGroups = async () => {
  const photos = await getImages();

  const photosInGroups = photos.reduce((accumulator, currentValue) => {
    // Find the index of the current group in the accumulator array
    const index = accumulator.findIndex(
      element => element[0].group_name === currentValue.group_name,
    );

    // If the current group already exists in the accumulator array, push the current value to its corresponding array
    if (index !== -1) {
      accumulator[index].push(currentValue);
    }
    // Otherwise, add a new array with the current value to the accumulator array
    else {
      accumulator.push([currentValue]);
    }
    return accumulator;
  }, []);

  return photosInGroups;
};

export const getAlbums = async () => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    console.log('returned');
    return;
  }

  const albums = await CameraRoll.getAlbums({assetType: 'Photos'});
  return albums;
};

export const getAlbumCover = async albumName => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    console.log('returned');
    return;
  }

  const response = await CameraRoll.getPhotos({
    groupName: albumName,
    first: 1,
  });
  const albumCover = response.edges[0].node.image;
  // console.log('Album Cover', albumCover);
  return albumCover;
};
export const getAlbumImages = async albumName => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    console.log('returned');
    return;
  }
  const p = await CameraRoll.getPhotos({
    groupName: albumName,
    first: 20,
  });
  const albumPhotos = p.edges.map(x => x.node);
  return albumPhotos;
};
