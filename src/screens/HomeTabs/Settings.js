import React, {useLayoutEffect, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import CustomDataTable from '../../components/UI/CustomDataTable';
import {
  fetchData,
  createTables,
  clearDatabase,
  clearPersons,
  clearEvents,
  handleSyncPhotos,
} from '../../database/helpers';
import {LogBox} from 'react-native';

import {
  photoTableHead,
  photoWidthArr,
  personTableHead,
  personWidthArr,
  photoEventTableHead,
  photoEventWidthArr,
  photoPersonTableHead,
  photoPersonWidthArr,
  eventTableHead,
  eventWidthArr,
  getDataInArray,
} from '../../utils/tables';
import {showToast} from '../../utils/toast';
import {BASE_URI} from '../../utils/api';

const Settings = () => {
  const isFocused = useIsFocused();
  const [photos, setPhotos] = useState([]);
  const [persons, setPersons] = useState([]);
  const [events, setEvents] = useState([]);
  const [photoEvent, setPhotoEvent] = useState([]);
  const [photoPerson, setPhotoPerson] = useState([]);

  const handleCleanDatabase = async () => {
    await clearDatabase();
    await init();
  };
  const init = async () => {
    clearStates();
    showToast('Fetching Data');
    const {persons, photos, events, photoEvents, photoPersons} =
      await fetchData();
    // console.log('photos', photos);
    if (photos) {
      const convertedPersons = getDataInArray(persons, personTableHead);
      const convertedPhotos = getDataInArray(photos, photoTableHead);
      const convertedEvents = getDataInArray(events, eventTableHead);
      const convertedPhotoEvents = getDataInArray(
        photoEvents,
        photoEventTableHead,
      );
      const convertedPhotoPersons = getDataInArray(
        photoPersons,
        photoPersonTableHead,
      );
      setPhotos(convertedPhotos);
      setPersons(convertedPersons);
      setEvents(convertedEvents);
      setPhotoEvent(convertedPhotoEvents);
      setPhotoPerson(convertedPhotoPersons);
      showToast('Data Fetched');
    }
  };

  const clearStates = () => {
    setPhotos([]);
    setPersons([]);
    setEvents([]);
    setPhotoEvent([]);
    setPhotoPerson([]);
  };
  useLayoutEffect(() => {
    // init();
  }, []);

  const handleSync = async () => {
    const data = await handleSyncPhotos();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(data);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(`${BASE_URI}/syncNow`, requestOptions);
    const results = await response.json();
    showToast(results);
  };

  return (
    <View
      style={[
        styles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Button mode="contained" onPress={handleSync} style={{marginRight: 5}}>
        Sync Now
      </Button>
    </View>
    // <ScrollView style={styles.container}>
    //   <ScrollView horizontal style={{flexDirection: 'row'}}>
    //     <Button mode="contained" onPress={handleSync} style={{marginRight: 5}}>
    //       Sync Now
    //     </Button>
    //     <Button
    //       mode="contained"
    //       onPress={clearPersons}
    //       style={{marginRight: 5}}>
    //       Clear Persons
    //     </Button>
    //     <Button mode="contained" onPress={clearEvents} style={{marginRight: 5}}>
    //       Clear Events
    //     </Button>
    //     <Button mode="contained" onPress={init} style={{marginRight: 5}}>
    //       Refresh Database
    //     </Button>
    //     <Button
    //       mode="contained"
    //       onPress={handleCleanDatabase}
    //       style={{marginRight: 5}}>
    //       Clear Database
    //     </Button>
    //   </ScrollView>
    //   {/* Persons Table */}
    //   <View style={styles.itemContainer}>
    //     <Text style={styles.headingText}>Person Table</Text>
    //     <CustomDataTable
    //       tableData={persons}
    //       tableHead={personTableHead}
    //       widthArr={personWidthArr}
    //     />
    //   </View>
    //   {/* Events Table */}
    //   <View style={styles.itemContainer}>
    //     <Text style={styles.headingText}>Events Table</Text>
    //     <CustomDataTable
    //       tableData={events}
    //       tableHead={eventTableHead}
    //       widthArr={eventWidthArr}
    //     />
    //   </View>
    //   {/* PhotoPerson Table */}
    //   <View style={styles.itemContainer}>
    //     <Text style={styles.headingText}>Photo Person Table</Text>
    //     <CustomDataTable
    //       tableData={photoPerson}
    //       tableHead={photoPersonTableHead}
    //       widthArr={photoPersonWidthArr}
    //     />
    //   </View>
    //   {/* PhotoEvent Table */}
    //   <View style={styles.itemContainer}>
    //     <Text style={styles.headingText}>Photo Event Table</Text>
    //     <CustomDataTable
    //       tableData={photoEvent}
    //       tableHead={photoEventTableHead}
    //       widthArr={photoEventWidthArr}
    //     />
    //   </View>
    //   {/* Photo Table */}
    //   <View style={styles.itemContainer}>
    //     <Text style={styles.headingText}>Photo Table</Text>
    //     <CustomDataTable
    //       tableData={photos}
    //       tableHead={photoTableHead}
    //       widthArr={photoWidthArr}
    //     />
    //   </View>
    // </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 50,
  },
  itemContainer: {
    marginBottom: 10,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
