import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {getPhotoCountOnMap} from '../../database/utils';
import {getDistance, getPreciseDistance} from 'geolib';
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
  const [newMarkers, setNewMarkers] = useState([]);
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

      // let's play with Markers now
      // const subArrays = [];

      // for (let i = 0; i < fileredMarkers.length; i++) {
      //   const initialObj = {
      //     lat: fileredMarkers[i].lat,
      //     lng: fileredMarkers[i].lng,
      //   };
      //   // const subArray = [fileredMarkers[i]];
      //   const subArray = [initialObj];

      //   for (let j = i + 1; j < fileredMarkers.length; j++) {
      //     const distance = getDistance(
      //       {latitude: fileredMarkers[i].lat, longitude: fileredMarkers[i].lng},
      //       {latitude: fileredMarkers[j].lat, longitude: fileredMarkers[j].lng},
      //       1,
      //       3,
      //     );

      //     if (distance <= 500) {
      //       const obj = {
      //         lat: fileredMarkers[j].lat,
      //         lng: fileredMarkers[j].lng,
      //       };
      //       // subArray.push(fileredMarkers[j]);
      //       subArray.push(obj);
      //     }
      //   }

      //   subArrays.push(subArray);
      // }
      // console.log('subArrays', subArrays.length);
      // setNewMarkers(subArrays);

      // // Define the radius in meters
      // const radiusInMeters = 3000;

      // // Define the sub arrays
      // const subArrays = [];

      // // Loop through the locationArray and create sub arrays for each location within 3km radius
      // fileredMarkers.forEach((location, index) => {
      //   // Check if the location has already been added to a sub array
      //   let alreadyAdded = false;
      //   for (let i = 0; i < subArrays.length; i++) {
      //     if (subArrays[i].includes(index)) {
      //       alreadyAdded = true;
      //       break;
      //     }
      //   }
      //   if (alreadyAdded) {
      //     return;
      //   }

      //   // Create a new sub array for the current location
      //   const subArray = [index];

      //   // Loop through the remaining locations and check if they are within 3km radius
      //   for (let i = index + 1; i < fileredMarkers.length; i++) {
      //     const distance = getDistance(location, {
      //       latitude: fileredMarkers[i].lat,
      //       longitude: fileredMarkers[i].lng,
      //     });
      //     if (distance <= radiusInMeters) {
      //       subArray.push(i);
      //     }
      //   }

      //   // Add the sub array to the main subArrays array
      //   subArrays.push(subArray);
      // });
      // console.log('Sub Arrays', subArrays);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={styles.container}>
      {location?.latitude && (
        <MapView style={{flex: 1}} initialRegion={location}>
          {/* {newMarkers.map((marker, index) => {
            console.log('marker', marker);
            // console.log('marker lat ', marker[0].lat);
            // console.log('lat', marker.lat);
            // console.log('lng', marker.lng);
            const coordinates = {
              latitude: marker[0].lat,
              longitude: marker[0].lng,
            };
            const photoCount = marker.length;
            console.log(photoCount);
            return (
              <Marker
                key={index}
                coordinate={coordinates}
                title={`Photo Count - ${photoCount}`}
                // title={`Photo Count - ${marker.image_count}`}
                // description={marker.image_count,}
              />
            );
          })} */}

          {markers.map((marker, index) => {
            // console.log('marker', marker);
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
    // paddingVertical: 10,
    // paddingHorizontal: 5,
    // backgroundColor: 'green',
  },
});
