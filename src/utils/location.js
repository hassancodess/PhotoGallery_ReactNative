import {getDistance} from 'geolib';
import GetLocation from 'react-native-get-location';

export const getDistanceGroups = (markers, markerDistance) => {
  try {
  } catch (error) {
    console.log('getDistanceGroups Error', error);
  }
  // Create arrays of items within 1km of each other
  const arrays = [];
  markers.forEach(item => {
    // Check if item is already in an array
    let found = false;
    arrays.forEach(array => {
      if (array.map(i => i.id).includes(item.id)) {
        found = true;
      }
    });
    if (found) {
      return;
    }

    // Create new array for item and add it to arrays
    const array = [item];
    arrays.push(array);

    // Check if other items are within 1km of this item and add them to the array
    markers.forEach(otherItem => {
      if (item.id === otherItem.id) {
        return;
      }
      const distance = getDistance(
        {latitude: item.lat, longitude: item.lng},
        {latitude: otherItem.lat, longitude: otherItem.lng},
      );
      if (distance <= markerDistance) {
        array.push(otherItem);
      }
    });
  });
  return arrays;
};

export const getCurrentLocation = async () => {
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    });
    const obj = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    return obj;
  } catch (error) {
    const {code, message} = error;
    console.warn('getCurrentLocation Error', code, message);
  }
};
