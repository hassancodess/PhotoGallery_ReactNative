import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPhotoCountOnMap} from '../../database/utils';
import {useIsFocused} from '@react-navigation/native';
// import {getC} from '../../utils/geocoder';
import {handleLocationAlbums} from '../../database/helpers';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';

const Location = () => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);

  const InitialSetup = async () => {
    try {
      const res = await handleLocationAlbums();
      setAlbums(res);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
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

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
