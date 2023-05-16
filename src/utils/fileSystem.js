import RNFS from 'react-native-fs';

const folderPath = RNFS.PicturesDirectoryPath + '/PhotoGallery/';

export const getAllImages = async () => {
  const response = await RNFS.readDir(folderPath);
  return response;
};

export const getSomeImages = async count => {
  const response = await RNFS.readDir(folderPath);
  return response.slice(0, count);
};
