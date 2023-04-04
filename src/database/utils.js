import {
  createAlbumTable,
  createPhotoTable,
  createPersonTable,
  createEventTable,
  createAlbumPhotoTable,
  createPhotoPersonTable,
  createPhotoEventTable,
  openDBConnection,
  deleteTables,
  fetchPhotos,
  fetchAlbums,
  addAlbum,
} from '../database/PhotoDB';
import {getImages} from '../utils/CameraRoll';

export const createTables = async () => {
  await openDBConnection();
  await createAlbumTable();
  await createPhotoTable();
  await createPersonTable();
  await createEventTable();
  await createAlbumPhotoTable();
  await createPhotoPersonTable();
  await createPhotoEventTable();
};

export const clearDatabase = async () => {
  await openDBConnection();
  await deleteTables();
};

export const getPhotos = async () => {
  await openDBConnection();
  const res = await fetchPhotos();
  // console.log('getPhotos', res);
  return res;
};
export const getAlbums = async () => {
  await openDBConnection();
  const res = await fetchAlbums();
  // console.log('getAlbums', res);
  return res;
};
export const createAlbum = async () => {
  await openDBConnection();
  const albums = await fetchAlbums();
  const image = await getImages(1);
  // console.log('Image', image);
  if (albums.length < 1) {
    await addAlbum('Others', image[0].image.uri);
  } else {
    console.log('Others Album Already Created');
  }
};
