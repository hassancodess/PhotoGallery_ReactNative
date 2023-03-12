import {Text, View, TextInput} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Search = () => {
  return (
    <View className="p-3">
      <View className="overflow-hidden flex-row">
        {/* Search Bar */}
        <View className="flex-row items-center px-3 w-11/12 rounded-full bg-gray-200">
          <Feather name="search" size={30} color="black" />
          <TextInput placeholder="Search your photos" className="ml-3 w-full" />
        </View>
        {/* Filter Icon */}
        <View className="flex-col items-center p-1">
          <Ionicons name="funnel" size={30} color="black" />
          <Text>Filter</Text>
        </View>
      </View>
    </View>
  );
};

export default Search;
