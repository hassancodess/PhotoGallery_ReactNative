import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
const Date = () => {
  // Navigation Hooks
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  // Route Params
  const {album} = route.params;

  // States
  const [photos, setPhotos] = useState();
  //
  useLayoutEffect(() => {
    if (isFocused) {
      // operations
    }
  }, [isFocused]);

  return (
    <View>
      <Text>Date</Text>
    </View>
  );
};

export default Date;

const styles = StyleSheet.create({});
