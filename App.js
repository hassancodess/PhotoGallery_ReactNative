import React, {useLayoutEffect} from 'react';
// Navigation
import MainStackNavigator from './src/navigation/MainStack/MainStackNavigator';
// Database Operations
import {
  createTables,
  clearDatabase,
  getPhotos,
  getAlbums,
  createAlbum,
} from './src/database/utils';

const InitialSetup = async () => {
  await createTables();
  await createAlbum();
  const albums = await getAlbums();
  const photos = await getPhotos();
};

const App = () => {
  // useLayoutEffect(() => {
  //   InitialSetup();
  //   // clearDatabase();
  // }, []);
  return (
    <>
      <MainStackNavigator />
    </>
  );
};

export default App;
