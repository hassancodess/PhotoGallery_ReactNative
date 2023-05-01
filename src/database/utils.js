import {
  openDBConnection,
  deleteTables,
  createAlbumTable,
  createPhotoTable,
  createPersonTable,
  createEventTable,
  createAlbumPhotoTable,
  createPhotoPersonTable,
  createPhotoEventTable,
  fetchPhotos,
  fetchAlbums,
  fetchAlbumPhoto,
  fetchPersons,
  fetchPhotoEvent,
  fetchPhotoPerson,
  fetchEvents,
  getPhotoIDByName,
  getAllPersons,
  addAlbumPhoto,
  addAlbum,
  addPhoto,
  addPerson,
  updatePerson,
  updateAlbum,
  getPersonID,
  getPersonNameByID,
  getAlbumID,
  addPhotoPerson,
  getDistinctDatesDB,
  getPhotosByDateDB,
  getPeopleNames,
  getAlbumByPersonName,
  getAllEvents,
  getEventID,
  addPhotoEvent,
  insertEvent,
  getEventsNames,
  getAlbumByEventName,
  getEventNameByID,
  updateEventDB,
  updatePhotoLocationDB,
} from '../database/PhotoDB';
import {getImages} from '../utils/CameraRoll';

export const createTables = async () => {
  await openDBConnection();
  await createAlbumTable();
  await createPhotoTable();
  await createPersonTable();
  await createEventTable();
  await createAlbumPhotoTable();
  await createPhotoPersonTable();
  await createPhotoEventTable();
  console.log('Tables Created Successfully');
};

export const checkData = async () => {
  await openDBConnection();
  const Falbums = await fetchAlbums();
  const photos = await fetchPhotos();
  const persons = await fetchPersons();
  const events = await fetchEvents();
  const AlbumPhoto = await fetchAlbumPhoto();
  const PhotoPerson = await fetchPhotoPerson();
  const PhotoEvent = await fetchPhotoEvent();

  return {
    albums: Falbums,
    photos,
    persons,
    events,
    AlbumPhoto,
    PhotoEvent,
    PhotoPerson,
  };
};

export const clearDatabase = async () => {
  await openDBConnection();
  await deleteTables();
};

export const getPhotos = async () => {
  await openDBConnection();
  const res = await fetchPhotos();
  // console.log('getPhotos', res);
  return res;
};
export const getAlbums = async () => {
  await openDBConnection();
  const res = await fetchAlbums();
  // console.log('getAlbums', res);
  return res;
};
export const createAlbum = async () => {
  await openDBConnection();
  const albums = await fetchAlbums();
  const image = await getImages(1);
  // console.log('Image', image);
  if (albums.length < 1) {
    await addAlbum('Others', image[0].image.uri);
  } else {
    console.log('Others Album Already Created');
  }
};

// Labels.js
export const handleAlbums = async () => {
  try {
    await openDBConnection();
    const photos = await fetchPhotos();
    if (photos.length < 1) {
      const res = await getImages();
      res.forEach(async item => {
        const photoName = item.image.uri.split('/').pop();
        const details = {
          title: photoName,
          lat: null,
          lng: null,
          path: item.image.uri,
          date_taken: new Date(item.timestamp * 1000).toLocaleString(),
          last_date_modified: new Date(item.modified * 1000).toLocaleString(),
        };
        await addPhoto(details);
        const photoID = await getPhotoIDByName(photoName);
        // console.log('Photo ID', photoID.id);
        const albumID = 1;
        await addAlbumPhoto(albumID, photoID.id);
      });
      const dbAlbums = await fetchAlbums();
      console.log('Initial Setup');
      return dbAlbums;
    } else {
      const dbAlbums = await fetchAlbums();
      console.log('Initial Setup');
      return dbAlbums;
    }
  } catch (error) {
    console.log('Handle Albums', error);
  }
};

// People Albums
export const handlePeopleAlbums = async () => {
  const names = await getPeopleNames();
  const albums = [];
  names.forEach(async item => {
    const album = await getAlbumByPersonName(item.name);
    // console.log(album);
    albums.push(album);
  });
  return albums;
};

export const handleEventsAlbums = async () => {
  const names = await getEventsNames();
  const albums = [];
  names.forEach(async item => {
    const album = await getAlbumByEventName(item.name);
    albums.push(album);
  });
  return albums;
};

// Photo.js

export const addAlbumOfPerson = async (personName, coverPhoto) => {
  await addAlbum(personName, coverPhoto);
};
export const addToPhotoPersonTable = async (personName, photoID) => {
  const personID = await getPersonID(personName);
  // console.log('PersonID', personID);
  await addPhotoPerson(photoID, personID);
};

export const addToPhotoEventTable = async (eventName, photoID) => {
  const eventID = await getEventID(eventName);
  // console.log('photoID', photoID);
  await addPhotoEvent(photoID, eventID);
};

export const addPeople = async (peopleList, photo) => {
  const persons = await getAllPersons();
  const {newPersons, oldPersons} = comparePeopleList(peopleList, persons);
  newPersons.forEach(async p => {
    await addPerson(p.name);
    await addAlbum(p.name, photo.path);
    await addToPhotoPersonTable(p.name, photo.id);
    const albumID = await getAlbumID(p.name);
    await addAlbumPhoto(albumID, photo.id);
  });
  oldPersons.forEach(async p => {
    await addToPhotoPersonTable(p.name, photo.id);
    const albumID = await getAlbumID(p.name);
    await addAlbumPhoto(albumID, photo.id);
  });
};

export const addEvent = async (eventList, photo) => {
  const events = await getAllEvents();
  const {newEvents, oldEvents} = compareEventsList(eventList, events);
  console.log(events);
  console.log(newEvents);
  console.log(oldEvents);
  console.log(photo);
  newEvents.forEach(async e => {
    await insertEvent(e.name);
    await addAlbum(e.name, photo.path);
    await addToPhotoEventTable(e.name, photo.photo_id);
    const albumID = await getAlbumID(e.name);
    await addAlbumPhoto(albumID, photo.photo_id);
  });
  // oldEvents.forEach(async e => {
  //   await addToPhotoEventTable(e.name, photo.photo_id);
  //   const albumID = await getAlbumID(e.name);
  //   await addAlbumPhoto(albumID, photo.photo_id);
  // });
};

export const updateAlbumOfPerson = async person => {
  // get old name of person by using his ID
  const personName = await getPersonNameByID(person.id);
  // console.log(person, 'asd');
  if (personName !== person.name) {
    // get AlbumID
    const albumID = await getAlbumID(personName);
    const album = {
      id: albumID,
      title: person.name,
    };
    await updateAlbum(album);
    await updatePerson(person);
    console.log('Updated Successfully');
  }
};

export const updateAlbumOfEvent = async event => {
  // get old name of event by using his ID
  const eventName = await getEventNameByID(event.id);
  // console.log(event, 'asd');
  if (eventName !== event.name) {
    // get AlbumID
    const albumID = await getAlbumID(eventName);
    const album = {
      id: albumID,
      title: event.name,
    };
    await updateAlbum(album);
    await updateEventDB(event);
    console.log('Updated Successfully');
  }
};

export const updatePeople = async peopleList => {
  peopleList.forEach(async p => {
    await updateAlbumOfPerson(p);
  });
};

export const updateEvent = async eventList => {
  eventList.forEach(async e => {
    await updateAlbumOfEvent(e);
  });
};

const comparePeopleList = (peopleList, peopleListDB) => {
  const newPersons = [];
  const oldPersons = [];

  // loop through first array
  for (let i = 0; i < peopleList.length; i++) {
    let matched = false;
    // loop through second array
    for (let j = 0; j < peopleListDB.length; j++) {
      // compare elements
      if (peopleList[i].name === peopleListDB[j].name) {
        matched = true;
        // mark element as matched and break out of loop
        break;
      }
    }
    // push unmatched element into third array
    if (!matched) {
      newPersons.push(peopleList[i]);
    } else {
      oldPersons.push(peopleList[i]);
    }
  }

  return {newPersons, oldPersons};
};
const compareEventsList = (eventsList, eventsListDB) => {
  const newEvents = [];
  const oldEvents = [];

  // loop through first array
  for (let i = 0; i < eventsList.length; i++) {
    let matched = false;
    // loop through second array
    for (let j = 0; j < eventsListDB.length; j++) {
      // compare elements
      if (eventsList[i].name === eventsListDB[j].name) {
        matched = true;
        // mark element as matched and break out of loop
        break;
      }
    }
    // push unmatched element into third array
    if (!matched) {
      newEvents.push(eventsList[i]);
    } else {
      oldEvents.push(eventsList[i]);
    }
  }

  return {newEvents, oldEvents};
};
// update Photo Location
export const updatePhotoLocation = async (photoID, lat, lng) => {
  console.log('asd');
  updatePhotoLocationDB(photoID, lat, lng);
};

// Date.js

export const getDistinctDates = async () => {
  await openDBConnection();
  const res = await getDistinctDatesDB();
  return res;
};

export const getPhotosByDate = async date => {
  const res = await getPhotosByDateDB(date);
  return res;
};
