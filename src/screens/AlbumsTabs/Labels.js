import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {createTables, createAlbum, handleAlbums} from '../../database/utils';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';

const Labels = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);

  const handleShowAlbums = async () => {
    const res = await handleAlbums();
    setAlbums(res);
  };
  const InitialSetup = async () => {
    await handleShowAlbums();
  };
  useLayoutEffect(() => {
    if (isFocused) {
      InitialSetup();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <AlbumsContainer albums={albums} />
    </View>
  );
};

export default Labels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
