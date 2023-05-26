import {convertExifDate, getCurrentDate} from '../utils/date';
import {getAllImages, storeImage} from '../utils/fileSystem';
import {getCity} from '../utils/geocoder';
import {captureImage} from '../utils/imagePicker';
import {getCurrentLocation} from '../utils/location';
import {getExifData, getLatLngExif} from '../utils/metadata';
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
  updatePhotoLabel,
  updatePhotoLocation,
  getEventsNames,
  getAlbumByEventName,
  fetchPhotoOfEvent,
  fetchPhotosOfEvent,
  fetchDistinctLabels,
  fetchPhotosByLabel,
  fetchPhotosHavingLocation,
  fetchEventsWithPhotoRelation,
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
    const exif = await getExifData(photo.path);
    const {latitude, longitude} = await getLatLngExif(photo.path);
    console.log('erer', latitude, longitude);
    // Creating photo details object
    const photoDetails = {
      title: photoName,
      path: photo.path,
      lat: latitude === 0 ? null : latitude,
      lng: longitude === 0 ? null : longitude,
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

export const updateLabelOfPhoto = async (photo_id, label) => {
  await updatePhotoLabel(photo_id, label);
};

export const updateLocationOfPhoto = async (photoID, lat, lng) => {
  updatePhotoLocation(photoID, lat, lng);
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

// Events
export const handleEventsAlbums = async () => {
  try {
    await openDBConnection();
    const events = await fetchEvents();
    const albums = [];
    for (const event of events) {
      const photos = await fetchPhotosOfEvent(event.id);
      // console.log('Cover', coverPhoto);
      const album = {
        id: event.id,
        title: event.name,
        cover_photo: photos[0].path,
        photos: photos,
      };
      albums.push(album);
      showToast('Fetched Albums by Events');
    }
    return albums;
  } catch (error) {
    showToast(error.message, 'error');
  }
};

// Labels
export const handleLabelsAlbums = async () => {
  try {
    await openDBConnection();
    const albums = [];
    const labels = await fetchDistinctLabels();
    for (const label of labels) {
      const photos = await fetchPhotosByLabel(label);
      const album = {
        id: Math.floor(Math.random() * 1000),
        title: label,
        cover_photo: photos[0].path,
        photos: photos,
      };
      albums.push(album);
    }
    return albums;
  } catch (error) {
    console.log('Handle Albums', error);
  }
};

// Location

export const handleLocationAlbums = async () => {
  try {
    console.log('started');
    await openDBConnection();
    const albums = [];
    showToast('Fetching Albums by Location');
    const photos = await fetchPhotosHavingLocation();
    // console.log('asd', photos);
    for (const photo of photos) {
      // console.log(photo.lat, photo.lng);
      const cityName = await getCity(photo.lat, photo.lng);
      // console.log(cityName);
      const isFound = albums.find(obj => obj.title === cityName);
      // console.log('isFound', isFound);
      if (isFound) {
        isFound.photos.push(photo);
      } else {
        const album = {
          id: Math.floor(Math.random() * 100),
          title: cityName,
          cover_photo: photo.path,
          photos: [photo],
        };
        albums.push(album);
      }
    }
    showToast('Fetched Albums by Location');
    return albums;
  } catch (error) {
    console.log('Handle Albums', error);
  }
};

// Camera

export const handleCaptureImage = async () => {
  const photo = await captureImage();
  console.log('photo', photo);

  // Gets Exif Data of Image
  const exif = await getExifData(photo.uri);
  // Gets Current Location
  const {latitude, longitude} = await getCurrentLocation();
  // Removes file:// from image path
  const cleanedPhotoPath = photo.uri.substring(7);

  // Creating photo details object
  const photoToStore = {
    uri: photo.uri,
    type: photo.type,
    name: photo.fileName,
  };
  const destinationPath = await storeImage(photoToStore);
  console.log('destinationPath', destinationPath);
  const photoDetails = {
    title: photo.fileName,
    path: destinationPath,
    lat: latitude,
    lng: longitude,
    date_taken: convertExifDate(exif.DateTime),
    last_modified_date: getCurrentDate(),
    isSynced: 0,
    label: 'Others',
  };
  await insertPhoto(photoDetails);
};

// Nested Events

export const initialEventsSetup = async album => {
  await openDBConnection();
  const events = await fetchEventsWithPhotoRelation();
  const results = [];
  // console.log('Album', album.photos);
  // console.log('Events', events);

  album.photos.forEach(photo => {
    const isPresent = events.find(e => e.photo_id === photo.id);
    if (isPresent) {
      // console.log('is Present', isPresent);
      const existingEvent = results.find(e => e.title === isPresent.name);
      if (existingEvent) {
        existingEvent.photos.push(photo);
      } else {
        const id = Math.floor(Math.random() * 1000);
        results.push({
          id,
          title: isPresent.name, //Event name
          cover_photo: photo.path,
          photos: [photo],
        });
      }
    }
  });
  return results;
};
