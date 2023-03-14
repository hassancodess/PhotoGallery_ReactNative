import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TextInput, Chip} from 'react-native-paper';

const EditDetails = () => {
  const [person, setPerson] = useState('Amna');
  const [people, setPeople] = useState(['Alesha', 'Hassan', 'Amna']);
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        {/* Row Item */}
        <View style={styles.rowContainer}>
          <Text style={styles.title}>People</Text>
          <TextInput
            value={person}
            onChangeText={text => setPerson(text)}
            style={styles.input}
          />
          {/* <View style={styles.chipContainer}> */}
          <FlatList
            data={people}
            // style={styles.chipContainer}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={(item, index) => index}
            numColumns={3}
            renderItem={({item}) => (
              <Chip
                // style={{flexGrow: 0}}
                onPress={() => console.log('Pressed')}
                mode="flat">
                {item}
              </Chip>
            )}
          />
          {/* <Chip
              icon="information"
              style={{flexGrow: 0}}
              onPress={() => console.log('Pressed')}
              mode="flat">
              Example Chip
            </Chip>
            <Chip
              icon="information"
              style={{flexGrow: 0}}
              onPress={() => console.log('Pressed')}
              mode="flat">
              Example Chip
            </Chip>
            <Chip
              icon="information"
              style={{flexGrow: 0}}
              onPress={() => console.log('Pressed')}
              mode="flat">
              Example Chip
            </Chip> */}
          {/* </View> */}
        </View>
        {/* Row Item */}
      </View>
    </View>
  );
};

export default EditDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  flexContainer: {
    gap: 20,
  },
  rowContainer: {
    gap: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  chipContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    gap: 10,
  },
});
