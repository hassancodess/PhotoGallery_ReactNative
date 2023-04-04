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
  addAlbumPhoto,
  addAlbum,
  addPhoto,
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
      // setAlbums(dbAlbums);
      return dbAlbums;
    } else {
      const dbAlbums = await fetchAlbums();
      // setAlbums(dbAlbums);
      return dbAlbums;
    }
  } catch (error) {
    console.log('Handle Albums', error);
  }
};
