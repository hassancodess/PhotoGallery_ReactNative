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
  getPersonID,
  getPersonNameByID,
  getAlbumID,
  addPhotoPerson,
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
};

export const checkData = async () => {
  await openDBConnection();
  const Falbums = await fetchAlbums();
  console.log('Albums', Falbums);
  const photos = await fetchPhotos();
  console.log('Photos', photos);
  const persons = await fetchPersons();
  console.log('Persons', persons);
  const events = await fetchEvents();
  console.log('Events', events);
  const AlbumPhoto = await fetchAlbumPhoto();
  console.log('AlbumPhoto', AlbumPhoto);
  const PhotoPerson = await fetchPhotoPerson();
  console.log('PhotoPerson', PhotoPerson);
  const PhotoEvent = await fetchPhotoEvent();
  console.log('PhotoEvent', PhotoEvent);
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

// All.js
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
      return dbAlbums;
    } else {
      const dbAlbums = await fetchAlbums();
      return dbAlbums;
    }
  } catch (error) {
    console.log('Handle Albums', error);
  }
};

// Photo.js

export const addAlbumOfPerson = async (personName, coverPhoto) => {
  await addAlbum(personName, coverPhoto);
};
export const addToPhotoPersonTable = async (personName, photoID) => {
  const personID = await getPersonID(personName);
  console.log('PersonID', personID);
  await addPhotoPerson(photoID, personID);
};
export const addPeople = async (peopleList, photo) => {
  const persons = await getAllPersons();
  const res = comparePeopleList(peopleList, persons);
  res.forEach(async p => {
    await addPerson(p.name);
    await addAlbumOfPerson(p.name, photo.path);
    await addToPhotoPersonTable(p.name, photo.photo_id);
  });
};
export const updateAlbumOfPerson = async person => {
  // get old name of person by using his ID
  const personName = await getPersonNameByID(person.id);
  // get AlbumID
  const albumID = await getAlbumID(personName);
  const album = {
    id: albumID,
    title: personName,
  };
  await updateAlbum(album);
};

export const updatePeople = async peopleList => {
  peopleList.forEach(async p => {
    await updateAlbumOfPerson(p);
    await updatePerson(p);
  });
};

const comparePeopleList = (peopleList, peopleListDB) => {
  const newPersons = [];

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
    }
  }

  return newPersons;
};

// add them to the person table
// create a new album with that person name
// get the person ID
//   add PhotoID & personID to PhotoPersonTable
