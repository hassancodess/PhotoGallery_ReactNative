import {openDatabase, enablePromise} from 'react-native-sqlite-storage';
import {ToastAndroid} from 'react-native';
enablePromise(true);
let db;

export const openDBConnection = async () => {
  db = await openDatabase({name: 'PhotoGalleryDB.db'});
};

export const createAlbumTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS Album(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL, 
        cover_photo TEXT);`;
    await db.executeSql(query);
    console.log('Album Table Created Successfully');
    // ToastAndroid.show('Album Table Created Successfully', ToastAndroid.SHORT);
  } catch (error) {
    console.log('Album Table Creation Unsuccessful');
  }
};

export const createPhotoTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS Photo(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL, 
          lat FLOAT, 
          lng FLOAT, 
          path TEXT NOT NULL, 
          date_taken TEXT NOT NULL, 
          last_modified_date TEXT NOT NULL);`;
    await db.executeSql(query);
    console.log('Photo Table Created Successfully');
    // ToastAndroid.show('Photo Table Created Successfully', ToastAndroid.SHORT);
  } catch (error) {
    console.log('Photo Table Creation Unsuccessful');
  }
};

export const createPersonTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS Person(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL);`;
    await db.executeSql(query);
    console.log('Person Table Created Successfully');
    // ToastAndroid.show('Person Table Created Successfully', ToastAndroid.SHORT);
  } catch (error) {
    console.log('Person Table Creation Unsuccessful');
  }
};

export const createEventTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS Event(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL);`;
    await db.executeSql(query);
    console.log('Event Table Created Successfully');
    // ToastAndroid.show('Event Table Created Successfully', ToastAndroid.SHORT);
  } catch (error) {
    console.log('Event Table Creation Unsuccessful');
  }
};

export const createAlbumPhotoTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS AlbumPhoto(
      album_id INTEGER,
      photo_id INTEGER,
      FOREIGN KEY (album_id) REFERENCES Album(id),
      FOREIGN KEY (photo_id) REFERENCES Photo(id)
      )`;

    await db.executeSql(query);
    console.log('AlbumPhoto Table Created Successfully');
    // ToastAndroid.show(
    //   'AlbumPhoto Table Created Successfully',
    //   ToastAndroid.SHORT,
    // );
  } catch (error) {
    console.log('AlbumPhoto Table Creation Unsuccessful');
  }
};

export const createPhotoPersonTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS PhotoPerson(
      photo_id INTEGER,
      person_id INTEGER,
      FOREIGN KEY (photo_id) REFERENCES Photo(id),
      FOREIGN KEY (person_id) REFERENCES Person(id)
      )`;
    await db.executeSql(query);
    console.log('PhotoPerson Table Created Successfully');
    // ToastAndroid.show(
    //   'PhotoPerson Table Created Successfully',
    //   ToastAndroid.SHORT,
    // );
  } catch (error) {
    console.log('PhotoPerson Table Creation Unsuccessful');
  }
};
export const createPhotoEventTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS PhotoEvent(
      photo_id INTEGER,
      event_id INTEGER,
      FOREIGN KEY (photo_id) REFERENCES Photo(id),
      FOREIGN KEY (event_id) REFERENCES Event(id)
      )`;
    await db.executeSql(query);
    console.log('PhotoEvent Table Created Successfully');
    // ToastAndroid.show(
    //   'PhotoEvent Table Created Successfully',
    //   ToastAndroid.SHORT,
    // );
  } catch (error) {
    console.log('PhotoEvent Table Creation Unsuccessful');
  }
};

export const fetchPhotos = async () => {
  try {
    let resultsSet = [];
    let query = `SELECT * FROM Photo`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: Fetch Photos', error);
  }
};

export const fetchAlbums = async () => {
  try {
    let resultsSet = [];
    let query = `SELECT * FROM Album`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: Fetch Albums');
  }
};
export const fetchPersons = async () => {
  try {
    let resultsSet = [];
    let query = `SELECT * FROM Person`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: Fetch Persons');
  }
};

export const fetchEvents = async () => {
  try {
    let resultsSet = [];
    let query = `SELECT * FROM Event`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: Fetch Events');
  }
};

export const fetchAlbumPhoto = async () => {
  try {
    let resultsSet = [];
    let query = `SELECT * FROM AlbumPhoto`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: Fetch Events');
  }
};
export const fetchPhotoEvent = async () => {
  try {
    let resultsSet = [];
    let query = `SELECT * FROM PhotoEvent`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: Fetch PhotoEvent');
  }
};
export const fetchPhotoPerson = async () => {
  try {
    let resultsSet = [];
    let query = `SELECT * FROM PhotoPerson`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: Fetch PhotoPerson');
  }
};

export const addPhoto = async photo => {
  try {
    const {title, lat, lng, path, date_taken, last_modified_date} = photo;
    console.log('last_date_modified DB', last_modified_date);
    let query = `INSERT INTO Photo(title, lat, lng, path, date_taken, last_modified_date) VALUES('${title}','${lat}','${lng}','${path}','${date_taken}','${last_modified_date}')`;
    await db.executeSql(query);
    console.log('Photo Added Successfully');
    // ToastAndroid.show('Photo Added Successfully', ToastAndroid.SHORT);
  } catch (error) {
    console.log('ERROR: Save Photo DB');
  }
};

export const addPerson = async personName => {
  try {
    let query = `INSERT INTO Person(name) VALUES('${personName}')`;
    await db.executeSql(query);
    console.log('Person Added Successfully');
    // ToastAndroid.show('Person Added Successfully', ToastAndroid.SHORT);
  } catch (error) {
    console.log('ERROR: Save Person DB');
  }
};

export const updatePerson = async person => {
  try {
    let query = `UPDATE Person
    SET name = ${person.name}
    WHERE id = ${person.id}`;
    await db.executeSql(query);
    console.log('Person Updated Successfully');
    // ToastAndroid.show('Person Added Successfully', ToastAndroid.SHORT);
  } catch (error) {
    console.log('ERROR: Save Person DB');
  }
};

export const addAlbum = async (albumName, coverPhoto = null) => {
  let query;
  try {
    if (coverPhoto) {
      query = `INSERT INTO Album(title, cover_photo) VALUES('${albumName}', '${coverPhoto}')`;
    } else {
      query = `INSERT INTO Album(title) VALUES('${albumName}')`;
    }
    await db.executeSql(query);
    console.log('Album Added Successfully');
    // ToastAndroid.show('Album Added Successfully', ToastAndroid.SHORT);
  } catch (error) {
    console.log('ERROR: Save Album DB');
  }
};
export const addPhotoPerson = async (photo_id, person_id) => {
  try {
    let query = `INSERT INTO PhotoPerson(photo_id, person_id) VALUES('${photo_id}', '${person_id}')`;
    await db.executeSql(query);
    console.log('PhotoPerson  Added Successfully');
    // ToastAndroid.show('PhotoPerson Added Successfully', ToastAndroid.SHORT);
  } catch (error) {
    console.log('ERROR: Save PhotoPerson DB', error);
  }
};

export const addAlbumPhoto = async (album_id, photo_id) => {
  try {
    let query = `INSERT INTO AlbumPhoto(album_id, photo_id) VALUES('${album_id}', '${photo_id}')`;
    await db.executeSql(query);
    console.log('AlbumPhoto Added Successfully');
    // ToastAndroid.show('AlbumPhoto Added Successfully', ToastAndroid.SHORT);
  } catch (error) {}
};

export const getPersonID = async personName => {
  try {
    let query = `SELECT * FROM Person WHERE name = '${personName}' LIMIT 1`;
    const res = await db.executeSql(query);
    let record = res[0].rows.item(0);
    // console.log('RECORD', record.id);
    return record.id;
  } catch (error) {
    console.log('ERROR: getPersonID DB', error);
  }
};
export const getPhotoIDByName = async photoName => {
  try {
    let query = `SELECT id FROM Photo WHERE title = '${photoName}' LIMIT 1`;
    const res = await db.executeSql(query);
    let record = res[0].rows.item(0);
    return record;
  } catch (error) {
    console.log('ERROR: getPersonID DB', error);
  }
};

export const getPhotosByAlbumID = async albumID => {
  try {
    const resultsSet = [];
    let query = `SELECT * FROM Photo 
    INNER JOIN AlbumPhoto ON AlbumPhoto.photo_id = Photo.id
    INNER JOIN Album ON Album.id = AlbumPhoto.album_id;`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: getPhotosByAlbumID DB', error);
  }
};

export const deleteTables = async () => {
  try {
    let query;
    query = `DROP TABLE IF EXISTS Album`;
    await db.executeSql(query);
    query = `DROP TABLE IF EXISTS AlbumPhoto`;
    await db.executeSql(query);
    query = `DROP TABLE IF EXISTS Event`;
    await db.executeSql(query);
    query = `DROP TABLE IF EXISTS Person`;
    await db.executeSql(query);
    query = `DROP TABLE IF EXISTS Photo`;
    await db.executeSql(query);
    query = `DROP TABLE IF EXISTS PhotoEvent`;
    await db.executeSql(query);
    query = `DROP TABLE IF EXISTS PhotoPerson`;
    await db.executeSql(query);
    console.log('Tables Deleted Successfully');
    // ToastAndroid.show('Tables Deleted Successfully', ToastAndroid.SHORT);
  } catch (error) {
    console.log('ERROR: Deleting Tables');
  }
};
