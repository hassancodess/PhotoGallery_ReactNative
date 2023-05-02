import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {useIsFocused} from '@react-navigation/native';
import {handlePeopleAlbums} from '../../database/utils';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';

const People = ({navigation}) => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);

  const InitialSetup = async () => {
    const res = await handlePeopleAlbums();
    setAlbums(res);
  };
  useLayoutEffect(() => {
    InitialSetup();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <AlbumsContainer albums={albums} />
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
});
