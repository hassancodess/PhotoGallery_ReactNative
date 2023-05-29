import {GMAPS_API_KEY} from './api';
import Geocoder from 'react-native-geocoding';

export const getCity = async (lat, lng) => {
  try {
    Geocoder.init(GMAPS_API_KEY);
    const res = await Geocoder.from(lat, lng);
    const data = res.results[0].address_components;
    const cityObject = data.find(d => {
      if (d.types.includes('locality')) {
        return d;
      }
    });
    return cityObject.long_name;
  } catch (error) {
    console.log('error: getCity', error);
  }
};
