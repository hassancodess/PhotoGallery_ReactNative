import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {createTables, createAlbum, handleAlbums} from '../../database/utils';

const All = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);

  const handleShowAlbums = async () => {
    const res = await handleAlbums();
    setAlbums(res);
  };
  const InitialSetup = async () => {
    await createTables();
    await createAlbum();
    await handleShowAlbums();
  };
  useLayoutEffect(() => {
    InitialSetup();
  }, [isFocused]);

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
