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
  fetchEvents,
  fetchAlbumPhoto,
  fetchPersons,
  fetchPhotoEvent,
  fetchPhotoPerson,
} from '../../database/PhotoDB';

import GlobalStyles from '../../utils/GlobalStyles';
import {check} from 'react-native-permissions';

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

  const checkData = async () => {
    await openDBConnection();
    const Falbums = await fetchAlbums();
    console.log('Albums', Falbums);
    const photos = await fetchPhotos();
    console.log('Photos', photos);
    const persons = await fetchPersons();
    console.log('Persons', persons);
    const events = await fetchPersons();
    console.log('Events', events);
    const AlbumPhoto = await fetchAlbumPhoto();
    console.log('AlbumPhoto', AlbumPhoto);
    const PhotoPerson = await fetchPhotoPerson();
    console.log('PhotoPerson', PhotoPerson);
    const PhotoEvent = await fetchPhotoEvent();
    console.log('PhotoEvent', PhotoEvent);
  };
  const InitialSetup = async () => {
    // await checkData();
    // await createTables();
    // await createAlbum();
    await handleImages();
    // await clearDatabase();
  };

  useEffect(() => {
    InitialSetup();
  }, []);

  const handleImages = async () => {
    try {
      await openDBConnection();
      const alb = await fetchPhotos();
      if (alb.length < 1) {
        const res = await getImages();
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
          // console.log('Photo ID', photoID.id);
          const albumID = 1;
          await addAlbumPhoto(albumID, photoID.id);
        });
      } else {
        const alb = await fetchAlbums();
        setAlbums(alb);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Album', {
            album: item,
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
      <FlatList
        data={albums}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
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
