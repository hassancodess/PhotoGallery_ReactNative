import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
// import Geocoder from '@timwangdev/react-native-geocoder';
import {getPhotoCountOnMap} from '../../database/utils';
import {useIsFocused} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

const Location = () => {
  const isFocused = useIsFocused();
  // const [location, setLocation] = useState('');
  const getAlbumsByGeoloc = async () => {
    Geocoder.init('AIzaSyCdmIHvKSHu-vKEeN0hcvjQrOtr8row6qE'); // use a valid API key
    Geocoder.from(33.52781049050959, 73.0970041) // GreenValley Bahria Phase 7 Coordinates
      .then(json => {
        var addressComponent = json.results[0].address_components[0];
        console.log(addressComponent);
      })
      .catch(error => console.warn(error));

    // try {
    // const position = {lat: 1.2, lng: -3.4};
    // const res = await Geocoder.geocodePosition(position, {
    //   // apiKey: 'AIzaSyCdmIHvKSHu-vKEeN0hcvjQrOtr8row6qE',
    //   // maxResults: 2,
    //   fallbackToGoogle: true,
    // });
    // console.log('results', res);
    // } catch (error) {
    // console.log('error', error);
    // }
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
      // getAlbumsByGeoloc(); // gives API error
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
