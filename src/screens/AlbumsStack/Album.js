import React, {useLayoutEffect, useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Button,
} from 'react-native';
import {getAlbumImages} from '../../utils/CameraRoll';
import FastImage from 'react-native-fast-image';
import GlobalStyles from '../../utils/GlobalStyles';
import {getPhotosByAlbumID} from '../../database/PhotoDB';
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  // gestureHandlerRootHOC,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const Album = ({navigation, route}) => {
  const {album} = route.params;
  // console.log('ALBUM ROUTE Params', album);
  const [photos, setPhotos] = useState([]);
  const [cols, setCols] = useState(3);
  const [scale, setScale] = useState(1);
  const maxCols = 5;
  const minCols = 2;
  const updateCols = action => {
    if (action === 'increment' && cols < maxCols) {
      setCols(cols + 1);
    } else if (action === 'decrement' && cols > minCols) {
      setCols(cols - 1);
    }
    // console.log('update', colsRef.current);
  };

  useEffect(() => {
    console.log('cols', cols);
  }, [cols]);

  const gesture = Gesture.Pinch().onEnd(event => {
    const newScale = event.scale;
    if (newScale < 0.5) {
      console.log('Pinch out');
      runOnJS(updateCols)('increment');
    } else if (newScale > 1.5) {
      console.log('Pinch in');
      runOnJS(updateCols)('decrement');
    }
  });

  useLayoutEffect(() => {
    // handleGetAlbumPhotos();
    navigation.setOptions({
      title: album.title,
    });
    handleGetAlbumPhotos();
  }, []);
  const handleGetAlbumPhotos = async () => {
    if (!album.photos) {
      const results = await getPhotosByAlbumID(album.id);
      // console.log('RES', results);
      setPhotos(results);
    }
    setPhotos(album.photos);
  };
  const renderItem = ({item, index}) => {
    // console.log('ITEM', item.image.uri);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('PhotoStack', {
            photo: item,
            // screen: 'Photo',
            // params: {photo: item},
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
  // const Root = gestureHandlerRootHOC(() => View);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.container}>
          <FlatList
            key={cols}
            data={photos}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            numColumns={cols}
          />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
    // </View>
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
