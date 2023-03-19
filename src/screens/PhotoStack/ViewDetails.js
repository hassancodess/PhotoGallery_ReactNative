import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ViewDetails = ({navigation, route}) => {
  const {photo} = route.params;
  const modifiedSeconds = photo.modified;
  const dateModified = new Date(modifiedSeconds * 1000).toLocaleString();
  const dateTakenSeconds = photo.timestamp;
  const dateTaken = new Date(dateTakenSeconds * 1000).toLocaleString();
  console.log('Modified Date', dateModified);
  // console.log('TimeStamp', dateTaken);
  // console.log('Photo', photo);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Title:{' '}
          <Text style={styles.detailsText}>
            {photo.image.uri.split('/').pop()}
          </Text>
        </Text>
        <Text style={styles.text}>
          Persons: <Text style={styles.detailsText}>Amna, Hassan</Text>
        </Text>
        <Text style={styles.text}>
          Events: <Text style={styles.detailsText}>Trip to Sudhan Gali</Text>
        </Text>
        <Text style={styles.text}>
          Location: <Text style={styles.detailsText}>None</Text>
        </Text>
        <Text style={styles.text}>
          Date Taken: <Text style={styles.detailsText}>{dateTaken}</Text>
        </Text>
        <Text style={styles.text}>
          Last Modified Date:{' '}
          <Text style={styles.detailsText}>{dateModified}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ViewDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  textContainer: {
    gap: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  detailsText: {
    fontSize: 16,
    fontWeight: '100',
  },
});
