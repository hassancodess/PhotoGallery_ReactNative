import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  getImagesInGroups,
  getAlbums,
  getAlbumCover,
  getImages,
} from '../../utils/CameraRoll';
import FastImage from 'react-native-fast-image';

import GlobalStyles from '../../utils/GlobalStyles';

const All = ({navigation, route}) => {
  const [albums, setAlbums] = useState([]);
  const [albumCovers, setAlbumCovers] = useState([]);

  useLayoutEffect(() => {
    const handleImages = async () => {
      const res = await handleGetAlbums();
      console.log('res', res);
    };
    handleImages();
  }, []);
  // useLayoutEffect(() => {
  // console.log('aBCS', albums);
  // if (albums != null) {
  // handleAlbumCovers();
  // }
  // console.log('Albums', albums);
  // console.log(albums.length);
  // }, [albums]);

  const handleAlbumCovers = async () => {
    const getCover = async item => {
      // console.log('cover item', item);
      const res = await getAlbumCover(item.title);
      return res;
    };
    const getCovers = albums.map(getCover);
    const results = await Promise.all(getCovers);
    // console.log(results.length);
    setAlbumCovers(results);
  };
  const handleGetImages = async () => {
    const response = await getImagesInGroups();
    setPhotos(response);
  };
  const handleGetAlbums = async () => {
    const response = await getAlbums();
    setAlbums(response);
  };

  const renderItem = ({item, index}) => {
    // console.log('ITEM', item);
    // console.log('URI', albumCovers[index].uri);
    return (
      <Pressable
        onPress={() => navigation.navigate('Album', {album: albums[index]})}>
        <View style={styles.albumContainer}>
          <FastImage
            style={styles.albumCover}
            source={{
              uri: albumCovers[index].uri,
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
      {/* )} */}
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
    width: 135,
    // height: 160,
    marginBottom: 20,
    // backgroundColor: 'green',
    alignItems: 'center',
  },
  albumCover: {
    width: 135,
    height: 135,
    borderRadius: 10,
    marginBottom: 8,
  },
  albumContainerText: {
    fontSize: 14,
    // fontWeight: 'semibold',
    textAlign: 'center',
    // paddingBottom: 30,

    // maxWidth: '50%',
    // alignSelf: 'center',
  },
});
