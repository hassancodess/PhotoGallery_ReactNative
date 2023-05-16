import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ViewDetails = ({navigation, route}) => {
  const {photo} = route.params;
  const dateModified = photo.last_modified_date;
  const dateTaken = photo.date_taken;
  // console.log('Photo', photo);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Title:{' '}
          <Text style={styles.detailsText}>{photo.path.split('/').pop()}</Text>
        </Text>
        <Text style={styles.text}>
          Persons: <Text style={styles.detailsText}>No People</Text>
        </Text>
        <Text style={styles.text}>
          Events:{' '}
          <Text style={styles.detailsText}>Calligraphy by Islamic Society</Text>
        </Text>
        <Text style={styles.text}>
          Location: <Text style={styles.detailsText}>None</Text>
        </Text>
        <Text style={styles.text}>
          Date Taken: <Text style={styles.detailsText}>{dateTaken}</Text>
        </Text>
        <Text style={styles.text}>
          Last Modified Date:{' '}
          <Text style={styles.detailsText}>{dateTaken}</Text>
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
