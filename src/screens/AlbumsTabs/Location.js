import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Geocoder from '@timwangdev/react-native-geocoder';
import {getPhotoCountOnMap} from '../../database/utils';
import {useIsFocused} from '@react-navigation/native';

const Location = () => {
  const isFocused = useIsFocused();
  // const [location, setLocation] = useState('');
  const getAlbumsByGeoloc = async () => {
    try {
      const position = {lat: 1.2, lng: -3.4};
      const res = await Geocoder.geocodePosition(position, {
        // apiKey: 'AIzaSyCdmIHvKSHu-vKEeN0hcvjQrOtr8row6qE',
        // maxResults: 2,
        fallbackToGoogle: true,
      });
      console.log('results', res);
    } catch (error) {
      console.log('error', error);
    }
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
      getAlbums();
    }
    // getAlbumsByGeolocation();
  }, [isFocused]);
  return (
    <View>
      <Text>Location</Text>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({});
