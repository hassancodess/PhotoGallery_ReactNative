import React, {useLayoutEffect, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';
import DataTable, {COL_TYPES} from 'react-native-datatable-component';
import {checkData, clearDatabase} from '../../database/utils';
import {useIsFocused} from '@react-navigation/native';
import CustomDataTable from '../../components/UI/CustomDataTable';
const Settings = () => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [persons, setPersons] = useState([]);
  const [events, setEvents] = useState([]);
  const [albumPhoto, setAlbumPhoto] = useState([]);
  const [photoEvent, setPhotoEvent] = useState([]);
  const [photoPerson, setPhotoPerson] = useState([]);

  const handleCleanDatabase = async () => {
    await clearDatabase();
    await getData();
  };
  useLayoutEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    try {
      const {
        albums,
        photos,
        persons,
        events,
        AlbumPhoto,
        PhotoEvent,
        PhotoPerson,
      } = await checkData();
      setAlbums(albums);
      setPhotos(photos);
      setPersons(persons);
      setEvents(events);
      setAlbumPhoto(AlbumPhoto);
      setPhotoEvent(PhotoEvent);
      setPhotoPerson(PhotoPerson);
    } catch (error) {
      setAlbums([]);
      setPhotos([]);
      setPersons([]);
      setEvents([]);
      setAlbumPhoto([]);
      setPhotoEvent([]);
      setPhotoPerson([]);
      console.log('ERROR', error);
    }
  };

  const albumSettings = {
    data: albums,
    colNames: ['id', 'title', 'cover_photo'],
    colSettings: [
      {name: 'id', type: COL_TYPES.INT, width: '8%'},
      {name: 'title', type: COL_TYPES.STRING, width: '22%'},
      {name: 'cover_photo', type: COL_TYPES.STRING, width: '70%'},
    ],
    pages: 1,
  };
  const personsSettings = {
    data: persons,
    colNames: ['id', 'name'],
    colSettings: [
      {name: 'id', type: COL_TYPES.INT, width: '10%'},
      {name: 'name', type: COL_TYPES.STRING, width: '90%'},
    ],
    pages: 1,
  };
  const albumPhotoSettings = {
    data: albumPhoto,
    colNames: ['album_id', 'photo_id'],
    colSettings: [
      {name: 'album_id', type: COL_TYPES.INT, width: '20%'},
      {name: 'photo_id', type: COL_TYPES.INT, width: '40%'},
    ],
    pages: albumPhoto?.length / 5,
  };
  const photoPersonSettings = {
    data: photoPerson,
    colNames: ['photo_id', 'person_id'],
    colSettings: [
      {name: 'photo_id', type: COL_TYPES.INT, width: '20%'},
      {name: 'person_id', type: COL_TYPES.INT, width: '40%'},
    ],
    pages: 1,
  };

  const photoSettings = {
    data: photos,
    colNames: [
      'id',
      'title',
      'lat',
      'lng',
      'path',
      'date_taken',
      'last_date_modified',
    ],
    colSettings: [
      {name: 'id', type: COL_TYPES.INT, width: '8%'},
      {name: 'title', type: COL_TYPES.STRING, width: '22%'},
      {name: 'lat', type: COL_TYPES.INT, width: '10%'},
      {name: 'lng', type: COL_TYPES.INT, width: '10%'},
      {name: 'path', type: COL_TYPES.STRING, width: '20%'},
      {name: 'date_taken', type: COL_TYPES.STRING, width: '15%'},
      {name: 'last_date_modified', type: COL_TYPES.STRING, width: '15%'},
    ],
    pages: photos?.length / 5,
  };
  const eventSettings = {
    data: events,
    colNames: ['id', 'name'],
    colSettings: [
      {name: 'id', type: COL_TYPES.INT, width: '10%'},
      {name: 'name', type: COL_TYPES.STRING, width: '90%'},
    ],
    pages: 1,
  };
  const photoEventSettings = {
    data: photoEvent,
    colNames: ['photo_id', 'event_id'],
    colSettings: [
      {name: 'photo_id', type: COL_TYPES.INT, width: '20%'},
      {name: 'event_id', type: COL_TYPES.INT, width: '40%'},
    ],
    pages: 1,
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Button mode="contained" onPress={handleCleanDatabase}>
            Clear Database
          </Button>
          <View style={styles.tableContainer}>
            <Text style={styles.tableText}>Albums Table</Text>
            <CustomDataTable settings={albumSettings} />
          </View>
          <View style={styles.tableContainer}>
            <Text style={styles.tableText}>Persons Table</Text>
            <CustomDataTable settings={personsSettings} />
          </View>
          <View style={styles.tableContainer}>
            <Text style={styles.tableText}>Photo Person Table</Text>
            <CustomDataTable settings={photoPersonSettings} />
          </View>
          <View style={styles.tableContainer}>
            <Text style={styles.tableText}>Album Photo Table</Text>
            <CustomDataTable settings={albumPhotoSettings} />
          </View>
          <View style={styles.tableContainer}>
            <Text style={styles.tableText}>Events Table</Text>
            <CustomDataTable settings={eventSettings} />
          </View>
          <View style={styles.tableContainer}>
            <Text style={styles.tableText}>Photo Event Table</Text>
            <CustomDataTable settings={photoEventSettings} />
          </View>
          <View style={styles.tableContainer}>
            <Text style={styles.tableText}>Photos Table</Text>
            <CustomDataTable settings={photoSettings} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tableContainer: {
    marginBottom: 5,
  },
  tableText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
