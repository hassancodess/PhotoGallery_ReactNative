import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {
  getDistinctDates,
  createAlbum,
  createTables,
  handleAlbums,
  getPhotosByDate,
} from '../../database/utils';

const Date = ({navigation}) => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);

  useLayoutEffect(() => {
    InitialSetup();
  }, [isFocused]);

  const InitialSetup = async () => {
    await createTables();
    await createAlbum();
    // const alb = await handleAlbums();
    // console.log(alb);
    const res = await getDistinctDates();
    const distinctDates = res.map(date => date.date_taken.split(',')[0]);
    // console.log(distinctDates);
    const fetchedAlbums = [];
    distinctDates.forEach(async date => {
      // console.log('date', date);
      const photos = await getPhotosByDate(date);
      const album = {
        // should be uuid
        id: Math.floor(Math.random() * 100),
        cover_photo: photos[0].path,
        title: date,
        photos,
      };
      // const parsedDate = Date.parse(date);
      // const newDate = new Date();
      // console.log(newDate);
      getFormattedDate(date);
      fetchedAlbums.push(album);
      // console.log('alb', album);
    });
    setAlbums(fetchedAlbums);
  };

  const getFormattedDate = date => {
    // parse date
    const newDate = date.split('/');
    // Get the day name
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // const dayName = dayNames[Parse.int(newDate[1]) / 7];
    console.log();

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

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Album', {
            album: item,
          })
        }>
        <View style={styles.albumContainer}>
          <FastImage
            style={styles.albumCover}
            source={{
              uri: item.cover_photo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.albumContainerText}>{item.title}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

export default Date;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  albumContainer: {
    width: 100,
    marginBottom: 20,
    alignItems: 'center',
  },
  albumCover: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  albumContainerText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});
