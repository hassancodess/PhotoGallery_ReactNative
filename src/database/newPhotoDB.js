import {openDatabase, enablePromise} from 'react-native-sqlite-storage';
import {showToast} from '../utils/toast';
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

// EditDetails
export const fetchEventByName = async eventName => {
  try {
    let query = `SELECT * FROM Event WHERE name = '${eventName}'`;
    const res = await db.executeSql(query);
    let record = res[0].rows.item(0);
    return record;
  } catch (error) {
    return null;
  }
};

export const insertEvent = async eventName => {
  try {
    let query = `INSERT INTO Event(name) VALUES('${eventName}')`;
    await db.executeSql(query);
    showToast('Event Added');
  } catch (error) {
    console.log('ERROR: Insert Event DB');
  }
};

export const fetchEventIDByName = async eventName => {
  try {
    let query = `SELECT id FROM Event WHERE name = '${eventName}'`;
    const res = await db.executeSql(query);
    let record = res[0].rows.item(0);
    return record.id;
  } catch (error) {
    return null;
  }
};
export const insertPhotoEvent = async (photo_id, event_id) => {
  try {
    let query = `INSERT INTO PhotoEvent(photo_id, event_id) VALUES('${photo_id}', '${event_id}')`;
    await db.executeSql(query);
    showToast('Insert To PhotoEvent');
  } catch (error) {
    console.log('ERROR: Fetch Event by ID DB');
  }
};

export const updateEventNameByID = async (id, name) => {
  try {
    let query = `UPDATE Event
    SET name = '${name}'
    WHERE id = ${id}`;
    await db.executeSql(query);
    showToast('Event Updated');
  } catch (error) {
    console.log('ERROR: Update Event DB');
  }
};

export const updatePhotoLabel = async (photo_id, label) => {
  try {
    let query = `UPDATE Photo
    SET label = '${label}'
    WHERE id = ${photo_id}`;
    await db.executeSql(query);
    showToast('Label Updated');
  } catch (error) {
    console.log('ERROR: Update Label DB');
  }
};
export const updatePhotoLocation = async (photoID, lat, lng) => {
  try {
    let query = `UPDATE Photo
    SET lat = '${lat}',
    lng = '${lng}'
    WHERE id = ${photoID}`;
    await db.executeSql(query);
    showToast('Photo Location Updated Successfully');
  } catch (error) {
    console.log('ERROR: Update Album DB');
  }
};

export const fetchPhotoEventByID = async (photo_id, event_id) => {
  try {
    let query = `SELECT * FROM PhotoEvent WHERE photo_id = '${photo_id}' AND event_id = ${event_id}`;
    const res = await db.executeSql(query);
    let record = res[0].rows.item(0);
    return record;
  } catch (error) {
    console.log('ERROR: Fetch PhotoEvent');
  }
};

export const fetchEventsOfPhoto = async photo_id => {
  try {
    const resultsSet = [];
    let query = `SELECT * FROM Event 
    INNER JOIN PhotoEvent 
    ON PhotoEvent.event_id = Event.id 
    WHERE PhotoEvent.photo_id = ${photo_id}`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      const obj = {
        id: record.id,
        name: record.name,
      };
      resultsSet.push(obj);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: getAllEventsInPhoto DB', error);
  }
};

export const deletePhotoEvent = async (event_id, photo_id) => {
  try {
    let query = `DELETE FROM PhotoEvent
  WHERE photo_id = ${photo_id} AND
  event_id = ${event_id}`;
    await db.executeSql(query);
    showToast('Delete From PhotoEvent');
  } catch (error) {
    console.log('ERROR: Update Event DB');
  }
};
export const deleteEvent = async event_id => {
  try {
    let query = `DELETE FROM Event
  WHERE id = ${event_id}`;
    await db.executeSql(query);
    showToast('Event Deleted');
  } catch (error) {
    console.log('ERROR: DELETE EVENT DB');
  }
};

export const fetchPhotoCountOfEvent = async event_id => {
  try {
    let query = `SELECT COUNT(photo_id) AS photo_count
    FROM PhotoEvent
    WHERE event_id = ${event_id};`;
    const res = await db.executeSql(query);
    let record = res[0].rows.item(0);
    return record.photo_count;
  } catch (error) {
    showToast('Fetch Photo Count Of Event', 'error');
  }
};
export const getEventsNames = async () => {
  try {
    const resultsSet = [];
    let query = `SELECT name from Event`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: getEventsNames DB', error);
  }
};
export const getAlbumByEventName = async name => {
  try {
    let query = `SELECT * FROM Album WHERE title = '${name}'`;
    const res = await db.executeSql(query);
    const record = res[0].rows.item(0);
    return record;
  } catch (error) {
    console.log('ERROR: getAlbumByEventName DB', error);
  }
};
export const fetchPhotosOfEvent = async id => {
  try {
    const resultsSet = [];
    let query = `SELECT *
    FROM Photo 
    INNER JOIN PhotoEvent ON Photo.id = PhotoEvent.photo_id
    WHERE PhotoEvent.event_id = ${id};`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('ERROR: getAlbumByEventName DB', error);
  }
};

export const fetchDistinctLabels = async () => {
  try {
    const resultsSet = [];
    let query = `SELECT DISTINCT label FROM Photo`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record.label);
    }
    return resultsSet;
  } catch (error) {
    showToast(error.message, 'error');
  }
};

export const fetchPhotosByLabel = async label => {
  try {
    const resultsSet = [];
    let query = `SELECT * FROM Photo WHERE label = '${label}'`;
    const res = await db.executeSql(query);
    for (let i = 0; i < res[0].rows.length; ++i) {
      let record = res[0].rows.item(i);
      resultsSet.push(record);
    }
    return resultsSet;
  } catch (error) {
    console.log('error', error);
    showToast(error.message, 'error');
  }
};
