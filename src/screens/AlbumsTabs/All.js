import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  getImagesInGroups,
  getAlbums,
  getAlbumCover,
  getImages,
} from '../../utils/CameraRoll';
import FastImage from 'react-native-fast-image';

import {
  openDBConnection,
  addPhoto,
  addAlbum,
  addAlbumPhoto,
  fetchPhotos,
  fetchAlbums,
  getPhotoIDByName,
  createAlbumTable,
  createPhotoTable,
  createPersonTable,
  createEventTable,
  createAlbumPhotoTable,
  createPhotoPersonTable,
  createPhotoEventTable,
  deleteTables,
} from '../../database/PhotoDB';

import GlobalStyles from '../../utils/GlobalStyles';

const createTables = async () => {
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
const getAlbumsfromDB = async () => {
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

const All = ({navigation, route}) => {
  const [albums, setAlbums] = useState([]);
  const [albumCovers, setAlbumCovers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const InitialSetup = async () => {
    await createTables();
    await createAlbum();
    await handleImages();
    // await clearDatabase();
  };

  useEffect(() => {
    InitialSetup();
  }, []);
  const getAllAlbums = async () => {
    const results_albums = await fetchAlbums();
  };
  const handleImages = async () => {
    try {
      await openDBConnection();
      const alb = await fetchPhotos();
      console.log('alb', alb.length);
      if (alb.length < 1) {
        const res = await getImages();
        setPhotos(res);
        res.forEach(async item => {
          const photoName = item.image.uri.split('/').pop();
          const details = {
            title: photoName,
            lat: null,
            lng: null,
            path: item.image.uri,
            date_taken: new Date(item.timestamp * 1000).toLocaleString(),
            last_date_modified: new Date(item.modified * 1000).toLocaleString(),
          };
          await addPhoto(details);
          const photoID = await getPhotoIDByName(photoName);
          const albumID = 1;
          await addAlbumPhoto(albumID, photoID);
        });
      } else {
        const alb = await fetchAlbums();
        setAlbums(alb);
        console.log('here');
        // return;
      }
    } catch (error) {
      console.log('err', error);
    }
  };
  // const handleAlbumCovers = async () => {
  //   const getCover = async item => {
  //     // console.log('cover item', item);
  //     const res = await getAlbumCover(item.title);
  //     return res;
  //   };
  //   const getCovers = albums.map(getCover);
  //   const results = await Promise.all(getCovers);
  //   // console.log(results.length);
  //   setAlbumCovers(results);
  // };
  // const handleGetAlbums = async () => {
  //   const response = await getAlbums();
  //   setAlbums(response);
  // };

  const renderItem = ({item, index}) => {
    console.log('ITEM', item);
    // console.log('URI', albumCovers[index].uri);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('PhotoStack', {
            screen: 'Photo',
            params: {photo: item},
          })
        }>
        <View style={styles.albumContainer}>
          <FastImage
            style={styles.albumCover}
            source={{
              uri: item.cover_photo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.albumContainerText}>{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* {albumCovers.length > 0 && albums.length > 0 && ( */}
      <FlatList
        data={albums}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
      {/* )}  */}
    </View>
  );
};

export default All;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // backgroundColor: GlobalStyles.colors.primary,
  },
  albumContainer: {
    width: 100,
    marginBottom: 20,
    alignItems: 'center',
  },
  albumCover: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  albumContainerText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});
