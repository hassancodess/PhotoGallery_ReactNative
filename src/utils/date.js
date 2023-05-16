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

export const convertDate = dateString => {
  //   console.log(typeof dateString);
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
};
