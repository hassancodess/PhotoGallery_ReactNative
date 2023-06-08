import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {getContacts} from '../../utils/contacts';
import LookupModal from 'react-native-lookup-modal';
// import {MaterialCommunity} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyles from '../../utils/GlobalStyles';
const ContactsTextInput = ({handleChange}) => {
  const [contacts, setContacts] = useState();
  const [user, setUser] = useState();

  const init = async () => {
    const response = await getContacts();
    setContacts(response);
  };
  const handleSelectContact = item => {
    handleChange(item);
  };
  useLayoutEffect(() => {
    init();
  }, []);
  useLayoutEffect(() => {
    // init();
    console.log('user', user);
  }, [user]);
  return (
    <LookupModal
      // visible={isVisible}
      hideSelectButton={false}
      data={contacts}
      value={user}
      onSelect={handleSelectContact}
      displayKey={'name'}
      itemTextStyle={styles.text}
      contentStyle={styles.text}
      itemStyle={styles.text}
      placeholder="Search for contacts"
      selectButtonTextStyle={{color: 'transparent'}}>
      <Icon name="contacts" size={22} color={GlobalStyles.colors.primary} />
    </LookupModal>
  );
};

export default ContactsTextInput;

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
