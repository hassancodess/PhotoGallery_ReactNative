import Exif from 'react-native-exif';

export const getExifData = async photo => {
  const data = await Exif.getExif(photo.path);
  return data.exif;
};
