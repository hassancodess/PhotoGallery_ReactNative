// import React, {useEffect, useState, useLayoutEffect} from 'react';
// import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
// import {
//   // Modal,
//   Portal,
//   TextInput,
//   Chip,
//   Button,
//   Provider,
// } from 'react-native-paper';
// import Modal from 'react-native-modal';
// import FastImage from 'react-native-fast-image';
// import GlobalStyles from '../../utils/GlobalStyles';
// import ChipsContainer from '../../components/UI/ChipsContainer';
// import {
//   addEvent,
//   addPeople,
//   updateEvent,
//   updatePeople,
//   updatePhotoLocation,
// } from '../../database/utils';
// import {
//   getAllPersonsInPhoto,
//   getAllEventsInPhoto,
// } from '../../database/PhotoDB';
// import MapView, {Marker} from 'react-native-maps';
// import GetLocation from 'react-native-get-location';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import {BASE_URI} from '../../utils/api';
// import AvatarList from '../../components/Photo/AvatarList';
// import MapModal from '../../components/Photo/MapModal';
// import {getCurrentLocation} from '../../utils/location';

// const EditDetails = ({route}) => {
//   const {photo} = route.params;
//   const photoName = photo.path.split('/').pop().split('.')[0];
//   const photoType = photo.title.split('.').pop();
//   const isFocused = useIsFocused();
//   const navigation = useNavigation();
//   // console.log('photo', photo);
//   // Person States
//   const [isPersonEditing, setIsPersonEditing] = useState();
//   const [personID, setPersonID] = useState();
//   const [person, setPerson] = useState();
//   const [people, setPeople] = useState([]);
//   // Event States
//   const [isEventEditing, setIsEventEditing] = useState();
//   const [eventID, setEventID] = useState();
//   const [event, setEvent] = useState();
//   const [events, setEvents] = useState([]);
//   // Labels States
//   const [isLabelEditing, setIsLabelEditing] = useState();
//   const [labelID, setLabelID] = useState();
//   const [label, setLabel] = useState();
//   const [labels, setLabels] = useState([]);
//   // Location States
//   const [location, setLocation] = useState({
//     latitude: photo?.lat != 'null' ? photo.lat : null,
//     longitude: photo?.lng != 'null' ? photo.lng : null,
//     latitudeDelta: 0.002,
//     longitudeDelta: 0.002,
//   });
//   const [modalLocation, setModalLocation] = useState({
//     latitude: location.latitude,
//     longitude: location.longitude,
//     latitudeDelta: 0.002,
//     longitudeDelta: 0.002,
//   });
//   const [isLocationAdded, setIsLocationAdded] = useState(false);
//   // Modal States
//   const [visible, setVisible] = useState(false);
//   const showModal = () => setVisible(true);
//   const hideModal = () => setVisible(false);

//   useLayoutEffect(() => {
//     if (isFocused) {
//       getPersonsInPhoto();
//       getEventsInPhoto();
//       if (!people.length > 0) {
//         console.log('here');
//         sendImagetoAPI();
//       }
//     }
//   }, [isFocused]);

//   const sendImagetoAPI = async () => {
//     try {
//       // console.log('photo type', photoType, 'file://'+photo.path, photo.title);

//       const formdata = new FormData();
//       formdata.append('file', {
//         uri: 'file://' + photo.path,
//         name: photo.title,
//         type: `image/${photoType}`,
//       });
//       var requestOptions = {
//         method: 'POST',
//         body: formdata,
//         redirect: 'follow',
//       };

//       const response = await fetch(`${BASE_URI}/saveImage`, requestOptions);

//       const data = await response.json();
//       console.log('data', data);

//       const dataPeople = [];
//       for (const key in data) {
//         const data = {
//           id: `uuid-${Math.floor(Math.random() * 100) + 1}`,
//           name: key,
//         };
//         dataPeople.push(data);
//       }

//       setPeople([...people, ...dataPeople]);
//     } catch (error) {
//       console.log('Error', error);
//     }
//   };
//   // OLD WORKING
//   const handleAddPerson = async () => {
//     const personName = person.trim();
//     if (!isPersonEditing) {
//       setPeople([
//         ...people,
//         {id: `uuid-${Math.floor(Math.random() * 100) + 1}`, name: personName},
//       ]);
//     } else {
//       const updatedPeople = people.map(item => {
//         if (item.id === personID) {
//           return {...item, name: personName};
//         }
//         return item;
//       });
//       setPeople(updatedPeople);
//     }
//     clearPersonEditingStates();
//   };

//   const handleAddEvent = () => {
//     const eventName = event.trim();
//     if (!isEventEditing) {
//       setEvents([
//         ...events,
//         {id: `uuid-${Math.floor(Math.random() * 100) + 1}`, name: eventName},
//       ]);
//     } else {
//       const updatedEvents = events.map(item => {
//         if (item.id === eventID) {
//           return {...item, name: eventName};
//         }
//         return item;
//       });
//       setEvents(updatedEvents);
//     }
//     clearEventsEditingStates();
//   };
//   const handleAddLabel = () => {
//     const labelName = label.trim();
//     if (!isLabelEditing) {
//       setLabels([
//         ...labels,
//         {id: `uuid-${Math.floor(Math.random() * 100) + 1}`, name: labelName},
//       ]);
//     } else {
//       const updatedLabels = labels.map(item => {
//         if (item.id === labelID) {
//           return {...item, name: labelName};
//         }
//         return item;
//       });
//       setLabels(updatedLabels);
//     }
//     clearLabelsEditingStates();
//   };

//   const clearPersonEditingStates = () => {
//     setPerson('');
//     setPersonID('');
//     setIsPersonEditing(false);
//   };
//   const clearEventsEditingStates = () => {
//     setEvent('');
//     setEventID('');
//     setIsEventEditing(false);
//   };
//   const clearLabelsEditingStates = () => {
//     setLabel('');
//     setLabelID('');
//     setIsLabelEditing(false);
//   };

//   const getPersonsInPhoto = async () => {
//     const res = await getAllPersonsInPhoto(photo.id);
//     setPeople(res);
//   };

//   const getEventsInPhoto = async () => {
//     const res = await getAllEventsInPhoto(photo.id);
//     // console.log('res', res);
//     setEvents(res);
//   };

//   const handleSave = async () => {
//     try {
//       // handling new Persons
//       const newPersons = [];
//       const personsToUpdate = [];
//       people.forEach(p => {
//         const hasID = p.id.toString().includes('uuid');
//         if (hasID) {
//           newPersons.push(p);
//         } else {
//           personsToUpdate.push(p);
//         }
//       });
//       // console.log('persons', newPersons);
//       // console.log('persons to update', personsToUpdate);
//       await addPeople(newPersons, photo);
//       await updatePeople(personsToUpdate);

//       // handling new Events
//       const newEvents = [];
//       const eventsToUpdate = [];
//       events.forEach(p => {
//         const hasID = p.id.toString().includes('uuid');
//         if (hasID) {
//           newEvents.push(p);
//         } else {
//           eventsToUpdate.push(p);
//         }
//       });
//       // console.log('events', events);
//       // console.log('events new', newEvents);
//       // console.log('events to update', eventsToUpdate);
//       await addEvent(newEvents, photo);
//       await updateEvent(eventsToUpdate);

//       // handling Labels

//       // handling Location
//       if (location.latitude != null) {
//         const photoID = photo.id;
//         const lat = location.latitude;
//         const lng = location.longitude;
//         // console.log('loc', photoID, lat, lng);
//         await updatePhotoLocation(photoID, lat, lng);
//       }
//       console.log('Image Data Updated');
//       navigation.goBack();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleMarkerChange = event => {
//     // console.log('HEHE', event.nativeEvent.coordinate);
//     const region = event.nativeEvent.coordinate;
//     setModalLocation({
//       ...modalLocation,
//       latitude: region.latitude,
//       longitude: region.longitude,
//     });
//   };

//   const handleModal = () => {
//     showModal();
//   };
//   const handleAddLocation = async () => {
//     const {longitude, latitude} = await getCurrentLocation();
//     setModalLocation({
//       ...modalLocation,
//       latitude: latitude,
//       longitude: longitude,
//     });
//     setIsLocationAdded(true);
//     showModal();
//   };
//   const handleAddLocationFromModal = () => {
//     setIsLocationAdded(true);
//     setLocation(modalLocation);
//     hideModal();
//   };
//   return (
//     <Provider>
//       {/* <View style={styles.container}> */}
//       <ScrollView
//         style={styles.container}
//         // style={styles.container}
//         // style={{backgroundColor: 'purple'}}
//         contentContainerStyle={{flex: 1}}>
//         <View style={styles.flexContainer}>
//           {/* People */}
//           <View style={styles.rowContainer}>
//             <Text style={styles.title}>People</Text>
//             <TextInput
//               value={person}
//               onChangeText={text => setPerson(text)}
//               style={styles.input}
//               onSubmitEditing={handleAddPerson}
//               placeholder="Type a person's name"
//             />
//             <ChipsContainer
//               items={people}
//               setItems={setPeople}
//               itemID={personID}
//               setItemID={setPersonID}
//               itemName={person}
//               setItemName={setPerson}
//               isEditing={isPersonEditing}
//               setIsEditing={setIsPersonEditing}
//               clearStates={clearPersonEditingStates}
//             />
//             {/* Faces */}
//             <AvatarList
//               photoName={photoName}
//               photoType={photoType}
//               items={people}
//             />
//           </View>
//           {/* </View> */}
//           {/* Events */}
//           <View style={styles.rowContainer}>
//             <Text style={styles.title}>Events</Text>
//             <TextInput
//               value={event}
//               onChangeText={text => setEvent(text)}
//               onSubmitEditing={handleAddEvent}
//               style={styles.input}
//               placeholder="Type an event"
//             />
//             <ChipsContainer
//               items={events}
//               setItems={setEvents}
//               itemID={eventID}
//               setItemID={setEventID}
//               itemName={event}
//               setItemName={setEvent}
//               isEditing={isEventEditing}
//               setIsEditing={setIsEventEditing}
//               clearStates={clearEventsEditingStates}
//             />
//           </View>
//           {/* Labels */}
//           <View style={styles.rowContainer}>
//             <Text style={styles.title}>Labels</Text>
//             <TextInput
//               value={label}
//               onChangeText={text => setLabel(text)}
//               onSubmitEditing={handleAddLabel}
//               style={styles.input}
//               placeholder="Type a label"
//             />
//             <ChipsContainer
//               items={labels}
//               setItems={setLabels}
//               itemID={labelID}
//               setItemID={setLabelID}
//               itemName={label}
//               setItemName={setLabel}
//               isEditing={isLabelEditing}
//               setIsEditing={setIsLabelEditing}
//               clearStates={clearLabelsEditingStates}
//             />
//           </View>
//           {/* Location */}
//           <View style={styles.rowContainer}>
//             <Text style={styles.title}>Location</Text>
//             {location?.latitude ? (
//               <Pressable onPress={handleModal}>
//                 {location && (
//                   <View style={styles.mapContainer}>
//                     <MapView style={styles.map} initialRegion={location}>
//                       <Marker coordinate={location} title="You" />
//                     </MapView>
//                   </View>
//                 )}
//               </Pressable>
//             ) : (
//               <Button mode="contained" onPress={handleAddLocation}>
//                 Add Location
//               </Button>
//             )}
//           </View>
//           {/* Save Button */}
//           <Button mode="contained" onPress={handleSave}>
//             Save
//           </Button>
//           <Modal
//             isVisible={visible}
//             onBackdropPress={hideModal}
//             style={{gap: 10}}>
//             <>
//               {modalLocation?.latitude && (
//                 <View
//                   style={{
//                     height: '80%',
//                     backgroundColor: 'blakc',
//                     borderRadius: 10,
//                     overflow: 'hidden',
//                   }}>
//                   <MapView style={styles.map} initialRegion={modalLocation}>
//                     <Marker
//                       coordinate={modalLocation}
//                       title="You"
//                       draggable={isLocationAdded ? true : false}
//                       onDragEnd={handleMarkerChange}
//                     />
//                   </MapView>
//                 </View>
//               )}
//               {!location?.latitude && (
//                 <Button mode="contained" onPress={handleAddLocationFromModal}>
//                   Add
//                 </Button>
//               )}
//             </>
//           </Modal>
//         </View>
//       </ScrollView>
//       {/* </View> */}
//     </Provider>
//   );
// };

// export default EditDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     // backgroundColor: 'red',
//   },
//   flexContainer: {
//     flex: 1,
//     gap: 20,
//     // backgroundColor: 'green',
//   },
//   rowContainer: {
//     gap: 10,
//     // backgroundColor: 'yellow',
//     // overflow: 'hidden',
//   },
//   mapContainer: {
//     height: 250,
//     width: '100%',
//     // overflow: 'hidden',
//   },
//   map: {
//     height: '100%',
//     width: '100%',
//     // backgroundColor: 'red',
//     // overflow: 'hidden',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     letterSpacing: 0.5,
//     color: GlobalStyles.colors.dark,
//   },
//   chipContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//   },
// });
// import GetLocation from 'react-native-get-location';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import MapModal from '../../components/Photo/MapModal';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useLayoutEffect, useContext, useEffect} from 'react';
import GlobalStyles from '../../utils/GlobalStyles';
import {TextInput, List, Chip, Button} from 'react-native-paper';
import ChipContainer from '../../components/ChipContainer';
import {
  addEventToDatabase,
  editEventToDatabase,
  updateLabelOfPhoto,
  updateLocationOfPhoto,
  handleUpdatePerson,
} from '../../database/helpers';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {getCurrentLocation} from '../../utils/location';
import AvatarList from '../../components/Photo/AvatarList';
import Modal from 'react-native-modal';
import PhotoContext from '../../context/PhotoContext';
import {showToast} from '../../utils/toast';

const EditDetails = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {photo} = route.params;
  // Context
  //API CALLS
  const {
    person,
    setPerson,
    isPersonTextDisabled,
    resetPersonStates,
    photoName,
    photoType,
    people,
    events,
    setPeople,
    setEvents,
    fetchPeopleAndEvents,
  } = useContext(PhotoContext);

  // Events States
  const [event, setEvent] = useState('');
  const [eventID, setEventID] = useState('');
  const [isEventEditing, setIsEventEditing] = useState(false);
  // Label States
  const [labelText, setLabelText] = useState('');
  const [label, setLabel] = useState(photo.label);
  // Location States
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
  // Modal States
  const [visible, setVisible] = useState(false);

  // Events Functions
  const handleAddEvent = async () => {
    if (!isEventEditing) {
      const obj = {
        id: Math.floor(Math.random() * 100),
        name: event.trim(),
      };
      setEvents(prev => [...prev, obj]);
      setEvent('');
      // add to Database
      await addEventToDatabase(obj.name, photo.id);
    } else {
      const editedEvent = {
        id: eventID,
        name: event.trim(),
      };
      const filteredItems = events.filter(e => e.id !== eventID);
      filteredItems.push(editedEvent);
      setEvents(filteredItems);
      setEvent('');
      setIsEventEditing(false);
      setEventID('');
      // add to Datbase
      await editEventToDatabase(editedEvent);
    }
    // await init();
  };

  // Label Functions
  const handleAddLabel = async () => {
    setLabel(labelText);
    await updateLabelOfPhoto(photo.id, labelText);
    setLabelText('');
  };

  const handleLabelEdit = async () => {
    setLabelText(label);
  };

  // Modal & Functions
  const showModal = () => setVisible(true);
  const hideModal = async () => {
    console.log('here');
    setVisible(false);
    if (location.latitude != modalLocation.latitude) {
      await updatePhotoLocation();
    }
  };
  const handleMarkerChange = event => {
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
  const updatePhotoLocation = async () => {
    if (modalLocation.latitude != null) {
      const photoID = photo.id;
      const lat = modalLocation.latitude;
      const lng = modalLocation.longitude;
      // console.log('loc', photoID, lat, lng);
      await updateLocationOfPhoto(photoID, lat, lng);
    }
  };
  const handleAddLocation = async () => {
    const {longitude, latitude} = await getCurrentLocation();
    setModalLocation({
      ...modalLocation,
      latitude: latitude,
      longitude: longitude,
    });
    setIsLocationAdded(true);
    showModal();
    await updatePhotoLocation();
  };

  const handleAddLocationFromModal = async () => {
    setIsLocationAdded(true);
    setLocation(modalLocation);
    hideModal();
    await updatePhotoLocation();
  };
  const init = async () => {
    console.log('init');
  };
  const handleChangePerson = async () => {
    const old_person = people.find(p => p.id == person.id);
    if (old_person.name === person.name) {
      showToast('No Update API Called');
    } else {
      await handleUpdatePerson(person, old_person);
      await fetchPeopleAndEvents();
    }
    resetPersonStates();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Persons</Text>
          <TextInput
            disabled={isPersonTextDisabled}
            value={person.name}
            placeholder="Type something"
            onChangeText={text => setPerson({...person, name: text})}
            onSubmitEditing={handleChangePerson}
          />
          <AvatarList
            photoName={photoName}
            photoType={photoType}
            items={people}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Events</Text>
          <ChipContainer
            item={event}
            setItem={setEvent}
            itemID={eventID}
            setItemID={setEventID}
            items={events}
            setItems={setEvents}
            handleAddItem={handleAddEvent}
            isEditing={isEventEditing}
            setIsEditing={setIsEventEditing}
            refresh={init}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Label</Text>
          <TextInput
            placeholder="Type something"
            value={labelText}
            onChangeText={text => setLabelText(text)}
            onSubmitEditing={handleAddLabel}
          />
          <View style={{flexDirection: 'row'}}>
            <Chip onClose={handleLabelEdit} closeIcon="pencil">
              <Pressable>
                <Text>{label}</Text>
              </Pressable>
            </Chip>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Location</Text>
          {location?.latitude ? (
            <Pressable onPress={handleModal}>
              {location.latitude && (
                <View style={styles.mapContainer}>
                  <MapView style={styles.map} initialRegion={location}>
                    <Marker coordinate={location} title="You" />
                  </MapView>
                </View>
              )}
            </Pressable>
          ) : (
            <Button mode="contained" onPress={handleAddLocation}>
              Add Location
            </Button>
          )}
          {/* <MapModal
            modalLocation={modalLocation}
            isLocationAdded={isLocationAdded}
            handleMarkerChange={handleMarkerChange}
            setModalLocation={setModalLocation}
            visible={visible}
            showModal={showModal}
            location={location}
            hideModal={hideModal}
            handleAddLocationFromModal={handleAddLocationFromModal}
          /> */}
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
                      // isPreselected={true}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // backgroundColor: 'red',
  },
  flexContainer: {
    flex: 1,
    gap: 20,
    // backgroundColor: 'green',
  },
  rowContainer: {
    gap: 8,
    // backgroundColor: 'yellow',
    // overflow: 'hidden',
  },
  mapContainer: {
    height: 250,
    width: '100%',
    // overflow: 'hidden',
  },
  map: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'red',
    // overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
    color: GlobalStyles.colors.dark,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
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
