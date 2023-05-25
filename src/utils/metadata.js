import Exif from 'react-native-exif';

export const getExifData = async path => {
  const data = await Exif.getExif(path);
  // console.log('exif', data.exif);
  return data.exif;
};
export const getLatLngExif = async path => {
  const location = await Exif.getLatLong(path);
  return location;
  // console.log('latitude', latitude, 'longitude', longitude);
};
