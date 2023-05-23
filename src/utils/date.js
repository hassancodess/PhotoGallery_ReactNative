export const getFormattedDate = date => {
  // parse date
  const newDate = date.split('/');
  // Get the day name
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // const dayName = dayNames[Parse.int(newDate[1]) / 7];

  // Get the month name
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  // const monthName = monthNames[date.getMonth()];

  // // Get the day of the month
  // const dayOfMonth = date.getDate();

  // // Combine the values into a formatted string
  // const formattedDate = dayOfMonth + monthName + ' - ' + date.getYear();
  // return formattedDate;
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
