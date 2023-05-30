import {BASE_URI} from '../utils/api';
import {
  convertExifDate,
  getCurrentDate,
  getFormattedDate,
  getNewDate,
} from '../utils/date';
import {getAllImages, storeImage} from '../utils/fileSystem';
import {getCity} from '../utils/geocoder';
import {captureImage} from '../utils/imagePicker';
import {getCurrentLocation} from '../utils/location';
import {getExifData, getLatLngExif} from '../utils/metadata';
import {
  askForCameraPermission,
  askForExternalStoragePermission,
  askForImagePermission,
  checkAndroidPermission,
  checkAndroidPermissionCameraRoll,
  getStoragePermissions,
} from '../utils/permissions';
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
  insertPerson,
  insertPhotoPerson,
  getPersonID,
  deleteEvents,
  deletePersons,
  getPhotoPersonCountByID,
  getPerson,
  fetchPersonsOfPhoto,
  updatePerson,
  fetchPhotosOfPerson,
  fetchPeopleWithPhotoRelation,
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

export const clearPersons = async () => {
  await deletePersons();
};
export const clearEvents = async () => {
  await deleteEvents();
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
  // await getStoragePermissions();
  // await checkAndroidPermission();
  // await checkAndroidPermissionCameraRoll();
  await askForCameraPermission();
  // await askForExternalStoragePermission();
  await askForImagePermission();
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
    // console.log('erer', latitude, longitude);

    let date = convertExifDate(exif.DateTime);
    if (!date) {
      date = getCurrentDate();
    }

    // Creating photo details object
    const photoDetails = {
      title: photoName,
      path: photo.path,
      lat: latitude === 0 ? null : latitude,
      lng: longitude === 0 ? null : longitude,
      date_taken: date,
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
      title: getFormattedDate(date),
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

export const getPeopleInPhoto = async photo_id => {
  await openDBConnection();
  const res = await fetchPersonsOfPhoto(photo_id);
  return res;
};

export const handleUpdatePerson = async (new_person, old_person) => {
  const res = await updatePersonNameFromAPI(old_person.name, new_person.name);
  if (res) {
    await updatePersonNameFromDB(new_person);
  }
};

const updatePersonNameFromDB = async person => {
  await openDBConnection();
  updatePerson(person);
};

const updatePersonNameFromAPI = async (old_name, new_name) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    old_names: [`${old_name}`],
    new_names: [`${new_name}`],
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  // const response = await fetch(`${BASE_URI}/updateName`, requestOptions);
  const response = await fetch(`${BASE_URI}/updateName`, requestOptions);
  showToast('here');
  if (response.status === 200) {
    const data = response.json();
    showToast(data);
    return data;
  }
  showToast('returning null');
  return null;
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
// Events
export const handlePeopleAlbums = async () => {
  try {
    await openDBConnection();
    const persons = await fetchPersons();
    const albums = [];
    for (const person of persons) {
      const photos = await fetchPhotosOfPerson(person.id);
      // console.log('Cover', coverPhoto);
      const album = {
        id: person.id,
        title: person.name,
        cover_photo: photos[0].path,
        photos: photos,
      };
      albums.push(album);
      showToast('Fetched Albums of People');
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

export const handleCaptureImageVisionCamera = async photo => {
  // Gets Exif Data of Image
  const exif = await getExifData(photo.path);
  console.log('exif', exif);
  // Gets Current Location
  const {latitude, longitude} = await getCurrentLocation();
  console.log('lat', latitude, 'lng', longitude);
  // Removes file:// from image path
  const cleanedPhotoPath = photo.path.substring(7);
  console.log('cleanedPhotoPath', cleanedPhotoPath);

  // Gets FileName
  const filename = photo.path.substring(photo.path.lastIndexOf('/') + 1);

  // Creating photo details object
  const photoToStore = {
    uri: photo.path,
    // type: photo.type,
    name: filename,
  };
  console.log('photo to store', photoToStore);
  const destinationPath = await storeImage(photoToStore);
  console.log('destinationPath', destinationPath);
  const photoDetails = {
    title: filename,
    path: destinationPath,
    lat: latitude,
    lng: longitude,
    date_taken: convertExifDate(exif.DateTime),
    last_modified_date: getCurrentDate(),
    isSynced: 0,
    label: 'Others',
  };
  console.log('photo details', photoDetails);
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
export const initialPeopleSetup = async album => {
  await openDBConnection();
  const persons = await fetchPeopleWithPhotoRelation();
  const results = [];
  // console.log('Album', album.photos);
  // console.log('Events', events);

  album.photos.forEach(photo => {
    const isPresent = persons.find(e => e.photo_id === photo.id);
    if (isPresent) {
      // console.log('is Present', isPresent);
      const existingPerson = results.find(e => e.title === isPresent.name);
      if (existingPerson) {
        existingPerson.photos.push(photo);
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

//
export const addPeopleToDatabase = async (people, photo_id) => {
  await openDBConnection();
  console.log('pid', photo_id);
  for (const p of people) {
    // console.log(p.name, p);
    await insertPerson(p.name);
    const personID = await getPersonID(p.name);
    console.log('personID', personID);
    await insertPhotoPerson(photo_id, personID);
  }
};

export const handlePersons = async photo => {
  await openDBConnection();
  const count = await getPhotoPersonCountByID(photo.id);

  if (count === 0) {
    const peopleList = await callAPI(photo);
    console.log('People List FROM API', peopleList);
    if (peopleList) {
      for (const p of peopleList) {
        //name exisits in DB
        console.log('p', p);
        const checkPerson = await getPerson(p.name);
        console.log('checkperson', checkPerson);
        if (!checkPerson) {
          await insertPerson(p.name);
          const personID = await getPersonID(p.name);
          await insertPhotoPerson(photo.id, personID);
        } else {
          const personID = await getPersonID(p.name);
          await insertPhotoPerson(photo.id, personID);
        }
      }
    }
  } else {
    showToast('NO API CALLED');
  }
};

const callAPI = async photo => {
  try {
    const photoType = photo.title.split('.').pop();
    const formdata = new FormData();
    formdata.append('file', {
      uri: 'file://' + photo.path,
      name: photo.title,
      type: `image/${photoType}`,
    });
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    const response = await fetch(`${BASE_URI}/saveImage`, requestOptions);
    showToast('API Called');
    // console.log('API Called');
    if (response.ok) {
      const data = await response.json();
      const dataPeople = [];
      if (typeof data !== 'string') {
        for (const key in data) {
          const data = {
            id: `uuid-${Math.floor(Math.random() * 100) + 1}`,
            name: key,
          };
          dataPeople.push(data);
        }
      }
      return dataPeople;
    }
  } catch (error) {
    showToast('API Not Available', 'error');
    console.log('API Not Available Error', error);
    return null;
  }
};

export const handleSyncPhotos = async () => {
  const photos = await fetchPhotos();
  console.log('photos', photos);
  const dataToSend = [];
  for (const photo of photos) {
    // PERSONS
    const persons = await fetchPersonsOfPhoto(photo.id);
    const personsArray = [];
    for (const person of persons) {
      personsArray.push(person.name);
    }
    // console.log('persons', personsArray);

    // EVENTS
    const events = await fetchEventsOfPhoto(photo.id);
    const eventsArray = [];
    for (const event of events) {
      eventsArray.push(event.name);
    }
    // console.log('events', eventsArray);
    const lat = photo?.lat === 'null' ? null : photo.lat;
    const lng = photo?.lng === 'null' ? null : photo.lng;
    const obj = {
      title: photo.title,
      people: personsArray,
      events: eventsArray,
      label: photo.label,
      lat: lat,
      lng: lng,
      date_taken: photo.date_taken,
      last_modified_date: photo.last_modified_date,
      isSynced: photo.isSynced,
    };
    dataToSend.push(obj);
    console.log(photo.lat, typeof photo.lat, photo.lat ? photo.lat : null);
  }
  console.log('data To Send', dataToSend);
  return dataToSend;
};

[
  {
    title: 'IMG_20220425_104946.jpg',
    people: ['Sir amir'],
    events: ['Angular Seminar'],
    label: 'Others',
    lat: 33.5749482,
    lng: 73.0464026,
    date_taken: '5/25/2022, 10:49:46 AM',
    last_modified_date: '05/29/2023, 10:06:20 PM',
    isSynced: 0,
  },
  {
    title: 'IMG_20230127_172314.jpg',
    people: ['Hassan', 'Sir Nouman '],
    events: ['BIIT Ceremony'],
    label: 'Others',
    lat: 'null',
    lng: 'null',
    date_taken: '2/27/2023, 5:23:14 PM',
    last_modified_date: '05/29/2023, 10:06:20 PM',
    isSynced: 0,
  },
  {
    title: 'IMG_20230127_172740.jpg',
    people: ['Hamza', 'Hassan'],
    events: ['BIIT Ceremony'],
    label: 'Others',
    lat: 33.5749505,
    lng: 73.0464136,
    date_taken: '2/27/2023, 5:27:40 PM',
    last_modified_date: '05/29/2023, 10:06:20 PM',
    isSynced: 0,
  },
  {
    title: 'IMG_3758.jpg',
    people: ['Irfan', 'Hassan'],
    events: ['Pitching'],
    label: 'Others',
    lat: 33.5749503,
    lng: 73.04642,
    date_taken: '3/17/2023, 11:37:13 AM',
    last_modified_date: '05/29/2023, 10:06:20 PM',
    isSynced: 0,
  },
  {
    title: 'rn_image_picker_lib_temp_382f7312-c0d5-421d-9789-836964453587.jpg',
    people: ['Sir Umar'],
    events: ['App Testing'],
    label: 'Others',
    lat: 33.574952,
    lng: 73.0464251,
    date_taken: '6/26/2023, 5:09:09 PM',
    last_modified_date: '05/29/2023, 10:06:20 PM',
    isSynced: 0,
  },
  {
    title: 'Screenshot_2023-05-26-17-10-43-884-edit_com.whatsapp.jpg',
    people: ['Sir Nouman'],
    events: ['Gala 2023'],
    label: 'Others',
    lat: 33.5749519,
    lng: 73.0464161,
    date_taken: '05/29/2023, 10:06:20 PM',
    last_modified_date: '05/29/2023, 10:06:20 PM',
    isSynced: 0,
  },
];
