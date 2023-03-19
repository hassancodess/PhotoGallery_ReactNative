import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import {
  Modal,
  Portal,
  TextInput,
  Chip,
  Button,
  Menu,
  Divider,
} from 'react-native-paper';
import GlobalStyles from '../../utils/GlobalStyles';

const EditDetails = () => {
  const [person, setPerson] = useState();
  const [people, setPeople] = useState([
    {id: 1, name: 'Alesha'},
    {id: 2, name: 'Hassan'},
    {id: 3, name: 'Amna'},
  ]);
  const [visible, setVisible] = useState(null);
  const openMenu = () => setVisible(null);
  const closeMenu = () => setVisible(null);
  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  // const containerStyle = {backgroundColor: 'white', padding: 20, margin: 60};

  const handleAddPerson = () => {
    setPeople([
      ...people,
      {id: Math.floor(Math.random() * 100) + 1, name: person},
    ]);
    setPerson('');
  };
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
            onSubmitEditing={handleAddPerson}
            placeholder="type something..."
          />
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
            {people.map((item, index) => (
              <Menu
                key={index}
                visible={visible == item.id}
                onDismiss={closeMenu}
                anchor={
                  <Chip mode="flat" onPress={() => setVisible(item.id)}>
                    {item.name}
                  </Chip>
                }>
                <Menu.Item onPress={() => {}} title="Edit" />
                <Divider />
                <Menu.Item onPress={() => {}} title="Delete" />
              </Menu>
            ))}
          </View>
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
