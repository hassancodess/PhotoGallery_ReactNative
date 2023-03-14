import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import {getAlbumImages} from '../../utils/CameraRoll';
import FastImage from 'react-native-fast-image';
import GlobalStyles from '../../utils/GlobalStyles';

const Album = ({navigation, route}) => {
  const {album} = route.params;
  const [photos, setPhotos] = useState([]);

  useLayoutEffect(() => {
    handleGetAlbumPhotos();
    navigation.setOptions({
      title: album.title,
    });
  }, []);
  const handleGetAlbumPhotos = async () => {
    const results = await getAlbumImages(album.title);
    setPhotos(results);
  };
  const renderItem = ({item, index}) => {
    // console.log('ITEM', item.image.uri);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('PhotoStack', {
            screen: 'Photo',
            params: {photo: item},
          })
        }>
        <View style={styles.photoContainer}>
          <FastImage
            style={styles.photoCover}
            source={{
              uri: item.image.uri,
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

export default Album;

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
