import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const numColumns = 2;
const AlbumsContainer = ({albums}) => {
  const navigation = useNavigation();

  const deviceWidth = Dimensions.get('window').width;

  const calculateItemWidth = (numColumns, deviceWidth) => {
    const spacing = 10; // Change this value as needed
    return (deviceWidth - spacing * (numColumns + 1)) / numColumns;
  };

  const calculateItemHeight = (numColumns, deviceWidth) => {
    const itemWidth = calculateItemWidth(numColumns, deviceWidth);
    return itemWidth;
  };
  const addEllipsis = str => {
    if (str.length <= 10) {
      return str;
    } else {
      return str.slice(0, 10) + '...';
    }
  };

  const renderItem = ({item}) => {
    const itemWidth = calculateItemWidth(numColumns, deviceWidth);
    const itemHeight = calculateItemHeight(numColumns, deviceWidth);

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
              uri: item.cover_photo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          {/* <Text style={styles.albumContainerText}>{item.title}</Text> */}
          <Text style={styles.albumContainerText}>{itemTitle}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    // <View style={styles.container}>
    <FlatList
      data={albums}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.listContainer}
      style={styles.list}
      columnWrapperStyle={styles.listColumnWrapper}
    />
    // </View>
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
    fontSize: numColumns <= 3 ? 14 : 12,
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
