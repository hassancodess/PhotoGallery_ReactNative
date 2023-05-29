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
export const getNewDate = () => {
  const now = new Date();

  // Get date components
  const month = now.getMonth() + 1; // Months are zero-based, so add 1
  const day = now.getDate();
  const year = now.getFullYear();

  // Get time components
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Format date and time
  const formattedDate = `${month.toString().padStart(2, '0')}/${day
    .toString()
    .padStart(2, '0')}/${year}`;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

  const dateTime = `${formattedDate}, ${formattedTime}`;
  return dateTime;
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
