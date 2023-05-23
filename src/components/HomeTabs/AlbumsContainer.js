import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const numColumns = 3;
const AlbumsContainer = ({albums}) => {
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get('window').width;
  const [cols, setCols] = useState(2);
  const maxCols = 5;
  const minCols = 2;

  const gesture = Gesture.Pinch()
    .onEnd(event => {
      const newScale = event.scale;
      if (newScale <= 1) {
        console.log('Pinch Out');
        runOnJS(updateCols)('increment');
      } else if (newScale > 1) {
        console.log('Pinch In');
        runOnJS(updateCols)('decrement');
      }
    })
    .runOnJS(true);

  const updateCols = action => {
    // console.log('update cols');
    if (action === 'increment' && cols < maxCols) {
      setCols(cols + 1);
    } else if (action === 'decrement' && cols > minCols) {
      setCols(cols - 1);
    }
  };

  const calculateItemWidth = (cols, deviceWidth) => {
    const spacing = 10; // Change this value as needed
    return (deviceWidth - spacing * (cols + 1)) / cols;
  };

  const calculateItemHeight = (cols, deviceWidth) => {
    const itemWidth = calculateItemWidth(cols, deviceWidth);
    return itemWidth;
  };
  const addEllipsis = str => {
    if (str.length <= 15) {
      return str;
    } else {
      return str.slice(0, 9) + '...';
    }
  };

  const renderItem = ({item}) => {
    const itemWidth = calculateItemWidth(cols, deviceWidth);
    const itemHeight = calculateItemHeight(cols, deviceWidth);

    const itemTitle = addEllipsis(item.title);
    return (
      <Pressable
        style={[
          styles.item,
          {width: itemWidth, height: itemHeight, backgroundColor: item.color},
        ]}
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
              uri: 'file://' + item.cover_photo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.albumContainerText}>{itemTitle}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={{flex: 1}}>
          <FlatList
            key={cols}
            data={albums}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            numColumns={cols}
            //   contentContainerStyle={styles.listContainer}
            style={styles.list}
            columnWrapperStyle={styles.listColumnWrapper}
          />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default AlbumsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
  albumContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  albumCover: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginBottom: 8,
  },
  albumContainerText: {
    fontSize: numColumns <= 3 ? 15 : 12,
    color: 'black',
    textAlign: 'center',
  },
  item: {
    borderRadius: 10,
  },
  listContainer: {
    padding: 10,
  },
  list: {
    flex: 1,
  },
  listColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 40,
  },
});
