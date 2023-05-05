import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  Searchbar,
  IconButton,
  RadioButton,
  TextInput,
  Button,
} from 'react-native-paper';
import GlobalStyles from '../../utils/GlobalStyles';

const Search = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [peopleRadioButtonValue, setPeopleRadioButtonValue] =
    useState('contains');
  const [placeRadioButtonValue, setPlaceRadioButtonValue] =
    useState('contains');
  const [eventRadioButtonValue, setEventRadioButtonValue] =
    useState('contains');
  const [dateRadioButtonValue, setDateRadioButtonValue] = useState('contains');

  const [people, setPeople] = useState('');
  const [place, setPlace] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleFilterButtonPress = () => {
    toggleModal();
  };
  const handleSaveButtonPress = () => {
    toggleModal();
  };
  const handleCancelButtonPress = () => {
    toggleModal();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <IconButton
          icon="filter"
          iconColor={GlobalStyles.colors.primary}
          size={36}
          onPress={handleFilterButtonPress}
          style={styles.iconButton}
        />
      </View>
      {/* <Text>
        {isModalVisible.toString()} - {searchQuery}
      </Text> */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={styles.modalContainer}>
        <View style={{flex: 1}}>
          {/* People Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.heading}>People</Text>
            {/* Radio Buttons */}
            <RadioButton.Group
              onValueChange={newValue => setPeopleRadioButtonValue(newValue)}
              value={peopleRadioButtonValue}>
              <View style={styles.radioButtonsContainer}>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Contains</Text>
                  <RadioButton value="contains" />
                </View>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Only</Text>
                  <RadioButton value="only" />
                </View>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Excluded</Text>
                  <RadioButton value="excluded" />
                </View>
              </View>
            </RadioButton.Group>
            {/* Text Input */}
            <TextInput
              label="People"
              value={people}
              onChangeText={text => setPeople(text)}
            />
          </View>
          {/* Place Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.heading}>Place</Text>
            {/* Radio Buttons */}
            <RadioButton.Group
              onValueChange={newValue => setPlaceRadioButtonValue(newValue)}
              value={placeRadioButtonValue}>
              <View style={styles.radioButtonsContainer}>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Contains</Text>
                  <RadioButton value="contains" />
                </View>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Only</Text>
                  <RadioButton value="only" />
                </View>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Excluded</Text>
                  <RadioButton value="excluded" />
                </View>
              </View>
            </RadioButton.Group>
            {/* Text Input */}
            <TextInput
              label="Place"
              value={place}
              onChangeText={text => setPlace(text)}
            />
          </View>
          {/* Event Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.heading}>Event</Text>
            {/* Radio Buttons */}
            <RadioButton.Group
              onValueChange={newValue => setEventRadioButtonValue(newValue)}
              value={eventRadioButtonValue}>
              <View style={styles.radioButtonsContainer}>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Contains</Text>
                  <RadioButton value="contains" />
                </View>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Only</Text>
                  <RadioButton value="only" />
                </View>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Excluded</Text>
                  <RadioButton value="excluded" />
                </View>
              </View>
            </RadioButton.Group>
            {/* Text Input */}
            <TextInput
              label="Event"
              value={event}
              onChangeText={text => setEvent(text)}
            />
          </View>
          {/* Date Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.heading}>Date</Text>
            {/* Radio Buttons */}
            <RadioButton.Group
              onValueChange={newValue => setDateRadioButtonValue(newValue)}
              value={dateRadioButtonValue}>
              <View style={styles.radioButtonsContainer}>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Contains</Text>
                  <RadioButton value="contains" />
                </View>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.body}>Excluded</Text>
                  <RadioButton value="excluded" />
                </View>
              </View>
            </RadioButton.Group>
            {/* Text Input */}
            <TextInput
              label="Date"
              value={date}
              onChangeText={text => setDate(text)}
            />
          </View>
          {/* Buttons Group */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              // icon="camera"
              style={{width: '45%'}}
              mode="outlined"
              onPress={handleCancelButtonPress}>
              Cancel
            </Button>
            <Button
              // icon="camera"
              style={{width: '45%'}}
              mode="contained"
              onPress={handleSaveButtonPress}>
              Save
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
  },
  modalContainer: {
    marginHorizontal: 20,
    marginVertical: 50,
    backgroundColor: GlobalStyles.colors.screen,
    borderRadius: 15,
    overflow: 'hidden',
    paddingVertical: 25,
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  searchBar: {
    width: '85%',
    borderRadius: 99,
  },
  iconButton: {
    // backgroundColor: 'green',
  },
  radioButtonContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: GlobalStyles.colors.dark,
  },
  body: {
    fontSize: 16,
    color: GlobalStyles.colors.dark,
  },
});
