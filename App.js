import React, {useLayoutEffect} from 'react';
// Navigation
import MainStackNavigator from './src/navigation/MainStack/MainStackNavigator';
// Database
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
} from './src/database/PhotoDB';
import {getImages} from './src/utils/CameraRoll';

const InitialSetup = async () => {
  await openDBConnection();
  await createAlbumTable();
  await createPhotoTable();
  await createPersonTable();
  await createEventTable();
  await createAlbumPhotoTable();
  await createPhotoPersonTable();
  await createPhotoEventTable();
};

const clearDatabase = async () => {
  await openDBConnection();
  await deleteTables();
};
const getPhotos = async () => {
  await openDBConnection();
  const res = await fetchPhotos();
  console.log('Res', res);
};
const getAlbums = async () => {
  await openDBConnection();
  const res = await fetchAlbums();
  // console.log('Res', res);
};
const createAlbum = async () => {
  await openDBConnection();
  const albums = await fetchAlbums();
  const image = await getImages(1);
  if (albums.length < 1) {
    addAlbum('Others', image[0].image.uri);
  } else {
    console.log('Others Album Already Created');
  }
};
const App = () => {
  useLayoutEffect(() => {
    // InitialSetup();
    // createAlbum();
    // getAlbums();
    // getPhotos();
    // clearDatabase();
  }, []);
  return (
    <>
      <MainStackNavigator />
    </>
  );
};

export default App;
