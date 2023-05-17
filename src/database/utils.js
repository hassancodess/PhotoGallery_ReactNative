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
  getPhotoCountOnMapDB,
} from '../database/PhotoDB';
import {getImages} from '../utils/CameraRoll';
import {convertDate, getFormattedDate} from '../utils/date';
import {getAllImages, getSomeImages} from '../utils/fileSystem';
import {getExifData} from '../utils/metadata';

export const createTables = async () => {
  await openDBConnection();
  await createAlbumTable();
  await createPhotoTable();
  await createPersonTable();
  await createEventTable();
  await createAlbumPhotoTable();
  await createPhotoPersonTable();
  await createPhotoEventTable();
  console.log('Tables Initialized');
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
export const new_createAlbum = async () => {
  try {
    const albums = await fetchAlbums();
    const image = await getSomeImages(1);
    const imagePath = `file://${image[0].path}`;

    if (albums.length < 1) {
      await addAlbum('Others', imagePath);
      console.log('Others Album Created');
    } else {
      console.log('Others Album Already Created');
    }
  } catch (error) {
    console.log('new Create Album:', error);
  }
};

export const new_addPhotosToDatabase = async photos => {
  try {
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
        date_taken: convertDate(exif.DateTime),
        last_modified_date: convertDate(exif.DateTimeDigitized),
      };
      // adds photodetails to photo table
      await addPhoto(photoDetails);
      // gets photo ID by name
      const photoID = await getPhotoIDByName(photoName);
      // adds to the first album -> Others
      const albumID = 1;
      // adds to the Album Photo
      await addAlbumPhoto(albumID, photoID.id);
    }

    // photos?.forEach(async photo => {
    //   const photoName = photo.path.split('/').pop();
    //   const exif = await getExifData(photo);
    //   const date_taken = convertDate(exif.DateTime);
    //   const last_modified_date = convertDate(exif.DateTimeDigitized);
    //   const photoDetails = {
    //     title: photoName,
    //     path: photo.path,
    //     lat: null,
    //     lng: null,
    //     date_taken,
    //     last_modified_date,
    //   };
    //   // console.log('details', photoDetails);
    //   // console.log('details', photoDetails);
    //   await addPhoto(photoDetails);
    //   const photoID = await getPhotoIDByName(photoName);
    //   const albumID = 1;
    //   await addAlbumPhoto(albumID, photoID.id);
    // });
  } catch (error) {
    console.log('error', error);
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
          last_modified_date: new Date(item.modified * 1000).toLocaleString(),
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

export const new_handleAlbums = async () => {
  try {
    const photos = await fetchPhotos();
    if (photos.length < 1) {
      const res = await getAllImages();
      await new_addPhotosToDatabase(res);
      console.log('Photos Added to Database');
    }
  } catch (error) {
    console.log('New Handle Albums', error);
  }
};

export const new_handleAlbumsByDate = async () => {
  try {
    await openDBConnection();
    // creates all the necessary tables
    await createTables();
    // it creates Others Album
    await new_createAlbum();
    // adds all the photos to database
    await new_handleAlbums();
    // get distinct dates from database
    const res = await getDistinctDates();
    // console.log('res', res);
    // splits dates and get only the date part
    const distinctDates = res.map(date => date.date_taken.split(',')[0]);
    // console.log(distinctDates);
    const albums = [];
    for (const date of distinctDates) {
      const photos = await getPhotosByDate(date);
      const album = {
        id: Math.floor(Math.random() * 100),
        cover_photo: photos[0].path,
        title: date,
        photos,
      };
      albums.push(album);
    }
    return albums;
  } catch (error) {
    console.log('getAlbumsByDate', error);
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
  // console.log('utils events', events);
  // console.log('utils newevents', newEvents);
  // console.log('utils oldevents', oldEvents);
  // console.log(photo);
  newEvents.forEach(async e => {
    await insertEvent(e.name);
    await addAlbum(e.name, photo.path);
    await addToPhotoEventTable(e.name, photo.id);
    const albumID = await getAlbumID(e.name);
    await addAlbumPhoto(albumID, photo.id);
  });
  oldEvents.forEach(async e => {
    await addToPhotoEventTable(e.name, photo.id);
    const albumID = await getAlbumID(e.name);
    await addAlbumPhoto(albumID, photo.id);
  });
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

export const getPhotoCountOnMap = async () => {
  try {
    const res = await getPhotoCountOnMapDB();
    return res;
  } catch (error) {
    console.log('ERROR: getPhotoCountOnMap Helper ->', error);
  }
};
