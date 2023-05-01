import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {getPhotoCountOnMap} from '../../database/utils';

const Map = () => {
  const isFocused = useIsFocused();
  useLayoutEffect(() => {
    if (isFocused) {
      getCurrentLocation();
      getMarkers();
    }
  }, [isFocused]);
  const [location, setLocation] = useState({
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  const [markers, setMarkers] = useState([]);
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
  const getMarkers = async () => {
    try {
      const res = await getPhotoCountOnMap();
      const fileredMarkers = res.filter(item => item.lat != 'null');
      console.log('filtered Markers', fileredMarkers);
      setMarkers(fileredMarkers);
    } catch (error) {
      console.log('errros', error);
    }
  };
  return (
    <View style={styles.container}>
      {location?.latitude && (
        <MapView style={{flex: 1}} initialRegion={location}>
          {markers.map((marker, index) => {
            console.log('marker', marker);
            // console.log('lat', marker.lat);
            // console.log('lng', marker.lng);
            const coordinates = {
              latitude: marker.lat,
              longitude: marker.lng,
            };
            return (
              <Marker
                key={index}
                coordinate={coordinates}
                title={`Photo Count - ${marker.image_count}`}
                // description={marker.image_count,}
              />
            );
          })}
        </MapView>
        // <MapView style={{flex: 1}} showsUserLocation initialRegion={location}>
        //   <Marker
        //     draggable
        //     coordinate={location}
        //     title="You"
        //     description="hehehe"
        //     onDragEnd={handleMarkerChange}
        //     // onPress={handleMarkerChange}
        //   />
        // </MapView>
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
