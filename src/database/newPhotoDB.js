import {openDatabase, enablePromise} from 'react-native-sqlite-storage';
enablePromise(true);
let db;

export const openDBConnection = async () => {
  db = await openDatabase({name: 'PhotoGalleryDB.db'});
};

// CREATE TABLES
export const createPhotoTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS Photo(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL, 
          lat FLOAT, 
          lng FLOAT, 
          path TEXT NOT NULL, 
          date_taken TEXT NOT NULL, 
          last_modified_date TEXT NOT NULL,
          isSynced INTEGER NOT NULL,
          label TEXT);`;
    await db.executeSql(query);
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
  } catch (error) {
    console.log('Event Table Creation Unsuccessful');
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
  } catch (error) {
    console.log('PhotoEvent Table Creation Unsuccessful');
  }
};

// Delete Tables
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
  } catch (error) {
    console.log('ERROR: Deleting Tables');
  }
};

// Fetch Data
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

// ADD to Photo Table
export const insertPhoto = async photo => {
  try {
    const {
      title,
      lat,
      lng,
      path,
      date_taken,
      last_modified_date,
      isSynced,
      label,
    } = photo;

    let query = `INSERT INTO Photo(title, lat, lng, path, date_taken, last_modified_date, isSynced, label) VALUES('${title}','${lat}','${lng}','${path}','${date_taken}','${last_modified_date}', '${isSynced}', '${label}')`;
    await db.executeSql(query);
  } catch (error) {
    console.log('ERROR: Save Photo DB');
  }
};

// Date
export const fetchDistinctDates = async () => {
  try {
    const resultsSet = [];
    let query = `SELECT DISTINCT substr(date_taken, 1, instr(date_taken, ',') - 1) AS date_taken FROM Photo`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: getDistinctDates DB', error);
  }
};
export const fetchPhotosByDate = async date => {
  try {
    const resultsSet = [];
    let query = `SELECT * FROM Photo WHERE substr(date_taken, 1, instr(date_taken, ',') - 1) LIKE '${date}'`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: getDistinctDates DB', error);
  }
};
