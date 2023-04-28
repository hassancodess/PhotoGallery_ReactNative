import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

const Map = () => {
  const [location, setLocation] = useState({
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        // console.log(location);
        setLocation({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };
  const handleRegionChange = region => {
    setLocation({
      ...location,
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };
  const handleMarkerChange = event => {
    // console.log('HEHE', event.nativeEvent.coordinate);
    const region = event.nativeEvent.coordinate;
    setLocation({
      ...location,
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };
  useLayoutEffect(() => {
    getCurrentLocation();
  }, []);
  return (
    <View style={styles.container}>
      {location?.latitude && (
        <MapView style={{flex: 1}} showsUserLocation initialRegion={location}>
          <Marker
            draggable
            coordinate={location}
            title="You"
            description="hehehe"
            onDragEnd={handleMarkerChange}
            // onPress={handleMarkerChange}
          />
        </MapView>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'green',
  },
});
