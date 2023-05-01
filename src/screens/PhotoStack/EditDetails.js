import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {
  // Modal,
  Portal,
  TextInput,
  Chip,
  Button,
  Provider,
} from 'react-native-paper';
import Modal from 'react-native-modal';

import GlobalStyles from '../../utils/GlobalStyles';
import ChipsContainer from '../../components/UI/ChipsContainer';
import {
  addEvent,
  addPeople,
  updateEvent,
  updatePeople,
  updatePhotoLocation,
} from '../../database/utils';
import {
  getAllPersonsInPhoto,
  getAllEventsInPhoto,
} from '../../database/PhotoDB';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

const EditDetails = ({route}) => {
  const {photo} = route.params;
  const [isPersonEditing, setIsPersonEditing] = useState();
  const [personID, setPersonID] = useState();
  const [person, setPerson] = useState();
  const [people, setPeople] = useState([]);
  const [isEventEditing, setIsEventEditing] = useState();
  const [eventID, setEventID] = useState();
  const [event, setEvent] = useState();
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState({
    latitude: photo?.lat != 'null' ? photo.lat : null,
    longitude: photo?.lng != 'null' ? photo.lng : null,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  const [modalLocation, setModalLocation] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  const [isLocationAdded, setIsLocationAdded] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    getPersonsInPhoto();
    getEventsInPhoto();
  }, []);
  useEffect(() => {
    console.log('location', location);
  }, []);

  const getCurrentLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });

      setModalLocation({
        ...modalLocation,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (error) {
      const {code, message} = error;
      console.warn(code, message);
    }
  };
  const handleAddPerson = async () => {
    if (!isPersonEditing) {
      setPeople([
        ...people,
        {id: `uuid-${Math.floor(Math.random() * 100) + 1}`, name: person},
      ]);
    } else {
      const updatedPeople = people.map(item => {
        if (item.id === personID) {
          return {...item, name: person};
        }
        return item;
      });
      setPeople(updatedPeople);
    }
    clearPersonEditingStates();
  };

  const handleAddEvent = () => {
    if (!isEventEditing) {
      setEvents([
        ...events,
        {id: `uuid-${Math.floor(Math.random() * 100) + 1}`, name: event},
      ]);
    } else {
      const updatedEvents = events.map(item => {
        if (item.id === eventID) {
          return {...item, name: event};
        }
        return item;
      });
      setEvents(updatedEvents);
    }
    clearEventsEditingStates();
  };

  const clearPersonEditingStates = () => {
    setPerson('');
    setPersonID('');
    setIsPersonEditing(false);
  };
  const clearEventsEditingStates = () => {
    setEvent('');
    setEventID('');
    setIsEventEditing(false);
  };

  const getPersonsInPhoto = async () => {
    const res = await getAllPersonsInPhoto(photo.id);
    setPeople(res);
  };

  const getEventsInPhoto = async () => {
    const res = await getAllEventsInPhoto(photo.id);
    // console.log('res', res);
    setEvents(res);
  };

  const handleSave = async () => {
    try {
      // handling new Persons
      const newPersons = [];
      const personsToUpdate = [];
      people.forEach(p => {
        const hasID = p.id.toString().includes('uuid');
        if (hasID) {
          newPersons.push(p);
        } else {
          personsToUpdate.push(p);
        }
      });
      console.log('persons', newPersons);
      console.log('persons to update', personsToUpdate);
      await addPeople(newPersons, photo);
      await updatePeople(personsToUpdate);

      // handling new Events
      const newEvents = [];
      const eventsToUpdate = [];
      events.forEach(p => {
        const hasID = p.id.toString().includes('uuid');
        if (hasID) {
          newEvents.push(p);
        } else {
          eventsToUpdate.push(p);
        }
      });
      console.log('events', events);
      console.log('events to update', eventsToUpdate);
      await addEvent(newEvents, photo);
      await updateEvent(eventsToUpdate);

      // handling Labels

      // handling Location
      const photoID = photo.id;
      const lat = location.latitude;
      const lng = location.longitude;
      // console.log('loc', photoID, lat, lng);
      await updatePhotoLocation(photoID, lat, lng);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMarkerChange = event => {
    // console.log('HEHE', event.nativeEvent.coordinate);
    const region = event.nativeEvent.coordinate;
    setModalLocation({
      ...modalLocation,
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  const handleModal = () => {
    showModal();
  };
  const handleAddLocation = () => {
    getCurrentLocation();
    setIsLocationAdded(true);
    showModal();
  };
  const handleAddLocationFromModal = () => {
    setIsLocationAdded(true);
    setLocation(modalLocation);
    hideModal();
  };
  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          {/* People */}
          <View style={styles.rowContainer}>
            <Text style={styles.title}>People</Text>
            <TextInput
              value={person}
              onChangeText={text => setPerson(text)}
              style={styles.input}
              onSubmitEditing={handleAddPerson}
              placeholder="Type a person's name"
            />
            <ChipsContainer
              items={people}
              setItems={setPeople}
              itemID={personID}
              setItemID={setPersonID}
              itemName={person}
              setItemName={setPerson}
              isEditing={isPersonEditing}
              setIsEditing={setIsPersonEditing}
              clearStates={clearPersonEditingStates}
            />
          </View>
          {/* Events */}
          <View style={styles.rowContainer}>
            <Text style={styles.title}>Events</Text>
            <TextInput
              value={event}
              onChangeText={text => setEvent(text)}
              onSubmitEditing={handleAddEvent}
              style={styles.input}
              placeholder="Type an event"
            />
            <ChipsContainer
              items={events}
              setItems={setEvents}
              itemID={eventID}
              setItemID={setEventID}
              itemName={event}
              setItemName={setEvent}
              isEditing={isEventEditing}
              setIsEditing={setIsEventEditing}
              clearStates={clearEventsEditingStates}
            />
          </View>
          {/* Location */}
          <View style={styles.rowContainer}>
            <Text style={styles.title}>Location</Text>
            {location?.latitude ? (
              <Pressable onPress={handleModal} style={styles.mapContainer}>
                {location && (
                  <MapView style={styles.map} initialRegion={location}>
                    <Marker coordinate={location} title="You" />
                  </MapView>
                )}
              </Pressable>
            ) : (
              <Button mode="contained" onPress={handleAddLocation}>
                Add Location
              </Button>
            )}
          </View>
          {/* Save Button */}
          <Button mode="contained" onPress={handleSave}>
            Save
          </Button>
          <Modal
            isVisible={visible}
            onBackdropPress={hideModal}
            style={{gap: 10}}>
            <>
              {modalLocation?.latitude ? (
                <View
                  style={{
                    height: '80%',
                    backgroundColor: 'red',
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <MapView style={styles.map} initialRegion={modalLocation}>
                    <Marker
                      coordinate={modalLocation}
                      title="You"
                      draggable={isLocationAdded ? true : false}
                      onDragEnd={handleMarkerChange}
                    />
                  </MapView>
                </View>
              ) : null}
              <Button mode="contained" onPress={handleAddLocationFromModal}>
                Add
              </Button>
            </>
          </Modal>
        </View>
      </View>
    </Provider>
  );
};

export default EditDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  flexContainer: {
    gap: 20,
  },
  rowContainer: {
    gap: 10,
  },
  mapContainer: {
    height: '50%',
    width: '100%',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
    color: GlobalStyles.colors.dark,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
