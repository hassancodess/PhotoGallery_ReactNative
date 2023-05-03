import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MapView, {Marker, Circle} from 'react-native-maps';
import {getPhotoCountOnMap} from '../../database/utils';
import {getCurrentLocation, getDistanceGroups} from '../../utils/location';

const Map = () => {
  // Navigation Hooks
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  // States
  const [location, setLocation] = useState({
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  const [markers, setMarkers] = useState([]);
  const [markerDistance, setMarkerDistance] = useState(500);

  // Layout Effect
  useLayoutEffect(() => {
    if (isFocused) {
      getLocation();
      getMarkers();
    }
  }, [isFocused]);

  // useEffect(() => {
  //   console.log('Marker Distance', markerDistance);
  //   getMarkers();
  // }, [markerDistance]);

  //  fetch current location
  const getLocation = async () => {
    try {
      const res = await getCurrentLocation();
      setLocation({...location, ...res});
    } catch (error) {
      console.log('error', error);
    }
  };

  // fetch markers and group them by distance
  const getMarkers = async () => {
    try {
      const res = await getPhotoCountOnMap();
      const filteredMarkers = res.filter(item => item.lat != 'null');
      const distanceGroups = getDistanceGroups(filteredMarkers, markerDistance);
      setMarkers(distanceGroups);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRegionChange = region => {
    try {
      // console.log('latitudeDelta', region.latitudeDelta);
      if (region.latitudeDelta > 0.02 && region.latitudeDelta < 0.15) {
        setMarkerDistance(1000);
      } else if (region.latitudeDelta > 0.15 && region.latitudeDelta < 0.3) {
        setMarkerDistance(2000);
      } else if (region.latitudeDelta > 0.3 && region.latitudeDelta < 0.5) {
        // console.log('asd');
        setMarkerDistance(3000);
      } else if (region.latitudeDelta > 0.5 && region.latitudeDelta < 1) {
        setMarkerDistance(10000);
      } else if (region.latitudeDelta > 1 && region.latitudeDelta < 2) {
        setMarkerDistance(20000);
      } else if (region.latitudeDelta > 2 && region.latitudeDelta < 3) {
        setMarkerDistance(40000);
      } else if (region.latitudeDelta > 3 && region.latitudeDelta < 5) {
        setMarkerDistance(60000);
      } else if (region.latitudeDelta > 5 && region.latitudeDelta < 20) {
        setMarkerDistance(500000);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  const navigateToAlbumTabs = markers => {
    // console.log('log', markers);
    const album = {
      // should be uuid
      id: Math.floor(Math.random() * 100),
      cover_photo: markers[0].path,
      title: 'Location Name',
      photos: markers,
    };
    navigation.navigate('AlbumTabs', {
      // screen: 'All',
      // params: {
      album,
      // },
    });
  };
  return (
    <View style={styles.container}>
      {location?.latitude && (
        <MapView
          style={{flex: 1}}
          initialRegion={location}
          onRegionChangeComplete={handleRegionChange}>
          {markers.map((marker, index) => {
            const coordinates = {
              latitude: marker[0].lat,
              longitude: marker[0].lng,
            };
            const photoCount = marker.length;
            return (
              <Marker
                key={index}
                coordinate={coordinates}
                title={`Photo Count - ${photoCount}`}
                onPress={() => navigateToAlbumTabs(markers[index])}
              />
            );
          })}
          {/* <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            fillColor="#FEFF86"
            radius={markerDistance}
          /> */}
        </MapView>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
