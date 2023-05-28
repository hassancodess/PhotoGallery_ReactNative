export const getFormattedDate = dateString => {
  // Convert input string to a Date object
  var dateParts = dateString.split('/');
  var date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);

  // Format the Date object as "25-May-2023"
  var formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return formattedDate;
};

export const convertExifDate = dateString => {
  if (typeof dateString == 'string') {
    const [datePart, timePart] = dateString.split(' ');

    const [year, month, day] = datePart.split(':');
    const [hour, minute, second] = timePart.split(':');

    const realDate = new Date(
      year,
      month,
      day,
      hour,
      minute,
      second,
    ).toLocaleString();
    return realDate;
  }
  return null;
};

export const getCurrentDate = () => {
  var today = new Date();
  var month = (today.getMonth() + 1).toString().padStart(2, '0');
  var day = today.getDate().toString().padStart(2, '0');
  var year = today.getFullYear();
  var hour = today.getHours().toString().padStart(2, '0');
  var minute = today.getMinutes().toString().padStart(2, '0');
  var second = today.getSeconds().toString().padStart(2, '0');
  var ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;

  var formatted_date =
    month +
    '/' +
    day +
    '/' +
    year +
    ', ' +
    hour +
    ':' +
    minute +
    ':' +
    second +
    ' ' +
    ampm;
  return formatted_date;
};

export const extractDate = date => {
  // Expected Input 05/24/2023, 11:02:18 PM
  // Expected Output 05/24/2023
  const dateOnly = date.split(',')[0].trim();
  return dateOnly;
};

export const getUniqueDates = dates => {
  // Expected Input 05/24/2023, 11:02:18 PM
  // Expected Output 05/24/2023
  const uniqueDates = dates.filter(
    (date, index) => dates.indexOf(date) === index,
  );

  console.log('unique', uniqueDates);
  // const dateOnly = date.split(',')[0].trim();
  // return dateOnly;
};
