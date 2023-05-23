import {convertExifDate, getCurrentDate} from '../utils/date';
import {getAllImages} from '../utils/fileSystem';
import {getExifData} from '../utils/metadata';
import {getStoragePermissions} from '../utils/permissions';
import {showToast} from '../utils/toast';
import {
  openDBConnection,
  createPhotoTable,
  createPersonTable,
  createEventTable,
  createPhotoEventTable,
  createPhotoPersonTable,
  deleteTables,
  fetchPhotos,
  fetchPersons,
  fetchEvents,
  fetchPhotoEvent,
  fetchPhotoPerson,
  insertPhoto,
  fetchDistinctDates,
  fetchPhotosByDate,
  fetchEventByName,
  insertEvent,
  fetchEventIDByName,
  insertPhotoEvent,
  updateEventNameByID,
  fetchPhotoEventByID,
  fetchEventsOfPhoto,
  deletePhotoEvent,
  fetchPhotoCountOfEvent,
  deleteEvent,
} from './newPhotoDB';

export const createTables = async () => {
  await openDBConnection();
  await createPhotoTable();
  await createPersonTable();
  await createEventTable();
  await createPhotoPersonTable();
  await createPhotoEventTable();
  // console.log('Tables Initialized');
  showToast('Tables Initialized');
};

export const clearDatabase = async () => {
  await deleteTables();
  showToast('Tables Deleted');
};

export const fetchData = async () => {
  await openDBConnection();
  const photos = await fetchPhotos();
  const persons = await fetchPersons();
  const events = await fetchEvents();
  const photoEvents = await fetchPhotoEvent();
  const photoPersons = await fetchPhotoPerson();
  return {photos, persons, events, photoEvents, photoPersons};
};

// INITIAL SETUP
export const initialSetup = async () => {
  // gets Storage Permissions
  await getStoragePermissions();
  //   Opens Database Connection
  await openDBConnection();
  // creates all the necessary tables
  await createTables();
  // handle photo
  await handlePhotos();
};

const handlePhotos = async () => {
  try {
    const photos = await fetchPhotos();
    if (photos.length < 1) {
      const res = await getAllImages();
      // console.log('res', res);
      await addPhotosToDatabase(res);
      showToast('Photos Added to Database');
    }
  } catch (error) {
    console.log('New Photos', error);
  }
};

export const addPhotosToDatabase = async photos => {
  for (const photo of photos) {
    // Gets Photo Name
    const photoName = photo.path.split('/').pop();
    // Gets Exif Data of Image
    const exif = await getExifData(photo);
    // Creating photo details object
    const photoDetails = {
      title: photoName,
      path: photo.path,
      lat: null,
      lng: null,
      date_taken: convertExifDate(exif.DateTime),
      last_modified_date: getCurrentDate(),
      isSynced: 0,
      label: 'Others',
    };
    await insertPhoto(photoDetails);
  }
};

//  Date.js

export const initialDateSetup = async () => {
  const response = await getDistinctDates();
  const distinctDates = response.map(date => date.date_taken.split(',')[0]);
  // console.log('distinct', distinctDates);
  const albums = await getAlbumsByDate(distinctDates);
  // console.log('albumes', albums);
  showToast('Fetched Albums By Date');
  return albums;
};
const getDistinctDates = async () => {
  await openDBConnection();
  const res = await fetchDistinctDates();
  return res;
};
const getAlbumsByDate = async distinctDates => {
  const albums = [];
  for (const date of distinctDates) {
    const photos = await fetchPhotosByDate(date);
    const album = {
      id: Math.floor(Math.random() * 100),
      cover_photo: photos[0].path,
      title: date,
      photos,
    };
    albums.push(album);
  }
  return albums;
};

// Edit Details
export const addEventToDatabase = async (eventName, photo_id) => {
  await openDBConnection();
  const res = await fetchEventByName(eventName);
  if (!res) {
    await insertEvent(eventName);
    let event_id = await fetchEventIDByName(eventName);
    await insertPhotoEvent(photo_id, event_id);
  } else {
    const isPhotoEventExists = await fetchPhotoEventByID(photo_id, res.id);
    if (!isPhotoEventExists) {
      await insertPhotoEvent(photo_id, res.id);
    }
  }
};

export const editEventToDatabase = async event => {
  await openDBConnection();
  // let event_id = await fetchEventIDByName(event.name);
  console.log('eventID', event.id);
  await updateEventNameByID(event.id, event.name);
};

export const deleteEventFromDatabase = async (event, photo_id) => {
  await openDBConnection();
  console.log('event', event, photo_id);
  await deletePhotoEvent(event.id, photo_id);
  // Check if event has pictures
  const photoCount = await getPhotosCountOfEvent(event.id);
  if (!photoCount > 0) {
    // delete event
    console.log('here');
    await deleteEvent(event.id);
  }
};

const getPhotosCountOfEvent = async event_id => {
  const res = await fetchPhotoCountOfEvent(event_id);
  return res;
};

export const getAllEventsOfPhoto = async photo_id => {
  await openDBConnection();
  const res = await fetchEventsOfPhoto(photo_id);
  return res;
};
