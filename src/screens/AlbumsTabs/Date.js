import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';
import {initialDateSetup} from '../../database/helpers';

const Date = () => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);

  useLayoutEffect(() => {
    if (isFocused) {
      initialDateSetup();
    }
  }, [isFocused]);

  // const InitialSetup = async () => {
  // handleEmptyDatabse
  //   const res = await handleAlbumsByDate();
  //   setAlbums(res);
  // };

  return (
    <View style={styles.container}>
      <AlbumsContainer albums={albums} />
    </View>
  );
};

export default Date;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
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
