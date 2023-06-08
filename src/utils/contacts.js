import Contacts from 'react-native-contacts';
import {askForContactsPermission} from './permissions';

export const getContacts = async () => {
  try {
    await askForContactsPermission();
    const contacts = await Contacts.getAll();
    // console.log('contacts', contacts);
    const filteredContacts = contacts.map(c => ({
      id: c.phoneNumbers[0].id,
      name: c.displayName,
      phone: c.phoneNumbers[0].number,
    }));
    return filteredContacts;
  } catch (error) {
    console.log('getContacts', error);
  }
};
