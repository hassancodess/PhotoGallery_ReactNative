import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPhotoCountOnMap} from '../../database/utils';
import {useIsFocused} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

const Location = () => {
  const isFocused = useIsFocused();
  const [location, setLocation] = useState('');

  const getAlbumsByGeoloc = async () => {
    Geocoder.init('AIzaSyDy_6oDRGGLua2ins00ATc_CMarYXEJTzk');
    Geocoder.from(33.64399900360248, 73.07896628465434)
      .then(json => {
        var addressComponent = json.results[0].address_components[1];
        console.log(addressComponent.long_name);
      })
      .catch(error => console.warn(error));
  };

  const getAlbums = async () => {
    try {
      const res = await getPhotoCountOnMap();
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // getAlbums();
      getAlbumsByGeoloc(); // gives API error
    }
  }, [isFocused]);
  return (
    <View>
      <Text>Location</Text>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({});
