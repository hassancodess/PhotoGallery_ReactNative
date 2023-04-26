import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {useIsFocused} from '@react-navigation/native';
import {handlePeopleAlbums} from '../../database/utils';

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

  const renderItem = ({item, index}) => {
    // console.log('ITEM', item);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('AlbumTabs', {
            screen: 'All',
            params: {
              album: item,
            },
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

export default People;

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
