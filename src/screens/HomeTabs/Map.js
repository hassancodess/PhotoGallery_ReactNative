import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';

const Map = () => {
  return (
    <View style={styles.container}>
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
      <MapView
        style={{flex: 1}}
        //  provider={PROVIDER_GOOGLE}
        // showsUserLocation
        initialRegion={{
          latitude: 33.5651,
          longitude: 73.0169,
          latitudeDelta: 0.09,
          longitudeDelta: 0.05,
        }}
      />
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
