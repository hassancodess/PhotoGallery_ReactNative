import React, {useEffect} from 'react';
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
} from './src/database/PhotoDB';

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
const App = () => {
  useEffect(() => {
    InitialSetup();
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
