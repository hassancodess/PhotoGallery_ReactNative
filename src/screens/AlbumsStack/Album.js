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

const ITEM_MARGIN = 8;
const Album = ({navigation, route}) => {
  const {album} = route.params;
  // console.log('ALBUM ROUTE Params', album);
  const [photos, setPhotos] = useState([]);
  const [cols, setCols] = useState(3);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [itemDimensions, setItemDimensions] = useState({width: 0, height: 0});

  const handleContainerLayout = event => {
    const {width} = event.nativeEvent.layout;
    const itemWidth = (width - 16) / cols; // subtract total padding and margin of all items
    const itemHeight = itemWidth * 1.5; // set the height of the item based on the aspect ratio of your images
    setItemDimensions({width: itemWidth, height: itemHeight});
  };
  const maxCols = 5;
  const minCols = 2;

  const handleLayout = event => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const getItemWidth = () => {
    return (containerWidth - ITEM_MARGIN * (cols + 1)) / cols;
  };

  const getItemHeight = () => {
    return (containerWidth - ITEM_MARGIN * (cols + 1)) / cols;
  };

  // const handleContainerLayout = event => {
  //   const containerWidth = event.nativeEvent.layout.width;
  //   setItemWidth((containerWidth - 16) / cols); // 16 is the total padding/margin of all items
  // };

  const getItemLayout = (data, index) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  });

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
    // const aspectRatio = item.width / item.height;
    // console.log('aspectRatio', aspectRatio);
    // const itemHeight = itemWidth / aspectRatio;
    // console.log('ITEM', item.image.uri);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('PhotoStack', {
            photo: item,
            // screen: 'Photo',
            // params: {photo: item},
          })
        }
        // style={}/
      >
        {/* <View style={[styles.photoContainer, {width: itemWidth, height: 100}]}> */}
        <View style={[styles.photoContainer, itemDimensions]}>
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
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={styles.container}
          // onLayout={handleContainerLayout}
        >
          <FlatList
            onLayout={handleContainerLayout}
            // onLayout={handleLayout}
            // columnWrapperStyle={{justifyContent: 'space-between'}}
            key={cols}
            data={photos}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            numColumns={cols}
            contentContainerStyle={{justifyContent: 'flex-start'}} // align items to start of container
            getItemLayout={getItemLayout}
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
    paddingHorizontal: 5,
    paddingVertical: 15,
    // margin: 20,
    backgroundColor: 'green',
    // alignItems: 'center',
  },
  photoContainer: {
    // width: '100%',
    // height: '100%',
    // marginBottom: 20,
    // alignItems: 'center',
    margin: 4,
    // backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  photoCover: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    // marginBottom: 8,
  },
});
