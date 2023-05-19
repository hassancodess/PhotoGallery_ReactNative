import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
const MapModal = ({
  location,
  visible,
  hideModal,
  showModal,
  isLocationAdded,
  modalLocation,
  setModalLocation,
  handleMarkerChange,
  handleAddLocationFromModal,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={hideModal}
      style={styles.modalContentContainer}>
      <>
        {modalLocation?.latitude && (
          <View style={styles.modalView}>
            <MapView style={styles.map} initialRegion={modalLocation}>
              <Marker
                coordinate={modalLocation}
                title="You"
                draggable={isLocationAdded ? true : false}
                onDragEnd={handleMarkerChange}
              />
            </MapView>
          </View>
        )}
        {!location?.latitude && (
          <Button mode="contained" onPress={handleAddLocationFromModal}>
            Add
          </Button>
        )}
      </>
    </Modal>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  modalContentContainer: {
    gap: 10,
  },
  modalView: {
    height: '80%',
    backgroundColor: 'blakc',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
