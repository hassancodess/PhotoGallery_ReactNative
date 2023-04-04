import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Chip, Button} from 'react-native-paper';
import GlobalStyles from '../../utils/GlobalStyles';
import ChipsContainer from '../../components/UI/ChipsContainer';
import {addPeople, updatePeople} from '../../database/utils';
const EditDetails = ({route}) => {
  const {photo} = route.params;
  // console.log('photo', photo);
  const [location, setLocation] = useState();
  const [isPersonEditing, setIsPersonEditing] = useState();
  const [personID, setPersonID] = useState();
  const [person, setPerson] = useState();
  const [people, setPeople] = useState([]);
  const [isEventEditing, setIsEventEditing] = useState();
  const [eventID, setEventID] = useState();
  const [event, setEvent] = useState();
  const [events, setEvents] = useState([]);

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

  const handleSave = async () => {
    // handling new Persons
    const newPersons = [];
    const personsToUpdate = [];
    people.forEach(async p => {
      const hasID = p.id.includes('uuid');
      if (hasID) {
        newPersons.push(p);
      } else {
        personsToUpdate.push(p);
      }
    });
    await addPeople(newPersons, photo);
    await updatePeople(personsToUpdate);

    // updating old Persons

    // if (p.id === null) {
    //   // Person Add
    //   await addPerson(p.name);
    //   // Album Add
    //   await addAlbum(person.name);
    //   // PhotoPerson Add
    //   // get personID
    //   const pID = await getPersonID(p.name);
    //   await addPhotoPerson(photo.photo_id, pID);
    //   // update State with People from DB
    // } else {
    //   await updatePerson(p);
    // }
  };

  return (
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
          <TextInput
            value={location}
            onChangeText={text => setLocation(text)}
            style={styles.input}
            placeholder="Enter a location"
            right={<TextInput.Icon icon="map-marker-radius" />}
          />
          {location && (
            <View style={{flexDirection: 'row'}}>
              <Chip mode="flat">{location}</Chip>
            </View>
          )}
        </View>
        {/* Save Button */}
        <Button mode="contained" onPress={handleSave}>
          Save
        </Button>
      </View>
    </View>
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
