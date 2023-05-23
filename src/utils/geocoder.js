import {GMAPS_API_KEY} from './api';
import Geocoder from 'react-native-geocoding';

export const getCity = async (lat, lng) => {
  Geocoder.init(GMAPS_API_KEY);
  const res = await Geocoder.from(lat, lng);
  const data = res.results[0].address_components;
  console.log('address', data);
  if (data.length >= 10) {
    const city = data[5].short_name;
    return city;
  } else {
    const city = data[2].short_name;
    return city;
  }
};
