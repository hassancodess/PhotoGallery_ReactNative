import Exif from 'react-native-exif';

export const getExifData = async path => {
  const data = await Exif.getExif(path);
  return data.exif;
};
