import {Text, View, FlatList, Image, Pressable} from 'react-native';
import React from 'react';
import {albums} from '../../data/data';
import FastImage from 'react-native-fast-image';
const Albums = ({navigation}) => {
  const showItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Album', {item});
        }}>
        <View className="flex-col items-center w-24 h-40 ">
          <View className="w-full h-28 overflow-hidden rounded-2xl">
            {/* <Image
              source={item.photos[0].path}
              resizeMode="contain"
              style={{width: '100%', height: '100%', borderRadius: 2}}
            /> */}
            <FastImage
              style={{width: '100%', height: '100%', borderRadius: 2}}
              source={item.photos[0].path}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text className="text-center">{item.title}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View className="p-3 flex-1 bg-slate-100">
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
        numColumns={4}
      />
    </View>
  );
};

export default Albums;
