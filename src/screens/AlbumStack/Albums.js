import {Text, View, FlatList, Image, Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {albums} from '../../data/data';
import FastImage from 'react-native-fast-image';
import Container from '../../components/UI/Container';
const Albums = ({navigation}) => {
  useLayoutEffect(() => {}, []);
  const showItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Album', {item});
        }}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={item.photos[0].path}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text className="text-center font-semibold">{item.title}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <Container>
      {/* Filter */}
      <View className="flex-row gap-x-4 self-center mb-10 mt-3">
        <Text className="border-b-purple-700 border-b-2">All</Text>
        <Text>People</Text>
        <Text>Events</Text>
        <Text>Location</Text>
      </View>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={albums}
        keyExtractor={(item, index) => index}
        renderItem={showItem}
        numColumns={3}
      />
    </Container>
  );
};

export default Albums;

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 20,
    gap: 4,
  },
  image: {
    flex: 1,
    width: 142,
    height: 180,
    borderRadius: 10,
  },
});
