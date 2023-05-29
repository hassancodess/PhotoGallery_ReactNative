import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';
import {initialSetup, initialDateSetup} from '../../database/helpers';
const Date = () => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);
  const init = async () => {
    await initialSetup();
    const res = await initialDateSetup();
    setAlbums(res);
  };

  useLayoutEffect(() => {
    if (isFocused) {
      init();
    }
  }, [isFocused]);

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
});
