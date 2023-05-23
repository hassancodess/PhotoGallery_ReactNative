export const photoTableHead = [
  'id',
  'title',
  'lat',
  'lng',
  'path',
  'date_taken',
  'last_modified_date',
  'isSynced',
  'label',
];
export const photoWidthArr = [100, 250, 150, 150, 250, 150, 150, 100, 150];

export const personTableHead = ['id', 'name'];
export const personWidthArr = [100, 300];

export const eventTableHead = ['id', 'name'];
export const eventWidthArr = [100, 300];

export const photoPersonTableHead = ['photo_id', 'person_id'];
export const photoPersonWidthArr = [100, 100];

export const photoEventTableHead = ['photo_id', 'event_id'];
export const photoEventWidthArr = [100, 100];

export const getDataInArray = (data, order) => {
  const convertedData = data.map(obj => order.map(key => obj[key]));
  return convertedData;
};
