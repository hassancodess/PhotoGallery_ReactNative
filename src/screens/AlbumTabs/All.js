import React, {useLayoutEffect, useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getPhotosByAlbumID} from '../../database/PhotoDB';
import {useIsFocused} from '@react-navigation/native';

const All = ({navigation, route}) => {
  const {album} = route.params;
  const [photos, setPhotos] = useState([]);
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) {
      handleGetAlbumPhotos();
    }
  }, [isFocused]);

  const handleGetAlbumPhotos = async () => {
    if (!album.photos) {
      const results = await getPhotosByAlbumID(album.id);
      setPhotos(results);
    } else {
      setPhotos(album.photos);
    }
  };
  const renderItem = ({item, index}) => {
    // console.log('ITEM', item.image.uri);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('PhotoStack', {
            photo: item,
          })
        }>
        <View style={styles.photoContainer}>
          <FastImage
            style={styles.photoCover}
            source={{
              uri: item.path,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        // style={{backgroundColor: 'green'}}
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
  },
  photoContainer: {
    width: 100,
    marginBottom: 20,
    alignItems: 'center',
  },
  photoCover: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
});
