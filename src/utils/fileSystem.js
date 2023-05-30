import RNFS from 'react-native-fs';
import {showToast} from './toast';

const folderPath = RNFS.PicturesDirectoryPath + '/samples/';

export const getAllImages = async () => {
  const response = await RNFS.readDir(folderPath);
  return response;
};

export const getSomeImages = async count => {
  const response = await RNFS.readDir(folderPath);
  return response.slice(0, count);
};

export const storeImage = async photo => {
  const destinationPath = `${folderPath}${photo.name}`;
  console.log('destinationPath', destinationPath);
  RNFS.moveFile(photo.uri, destinationPath)
    .then(result => {
      console.log('Successfully moved file to specified destination.');
      showToast('Successfully moved file to specified destination.');
    })
    .catch(err => {
      console.log(err.message);
      showToast(err.message, 'error');
    });
  return destinationPath;
};
