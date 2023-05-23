import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  FlatList,
} from 'react-native';
import {TextInput, List, Chip} from 'react-native-paper';
import {deleteEventFromDatabase} from '../database/helpers';
import {useRoute} from '@react-navigation/native';

const ChipContainer = ({
  item,
  setItem,
  itemID,
  setItemID,
  items,
  setItems,
  isEditing,
  setIsEditing,
  handleAddItem,
  refresh,
}) => {
  const route = useRoute();
  const {photo} = route.params;
  const renderItem = ({item}) => {
    const handleDelete = async () => {
      const filteredItems = items.filter(e => e.id != item.id);
      setItems(filteredItems);
      setItem('');
      setItemID('');
      // Delete From Database
      await deleteEventFromDatabase(item, photo.id);
      await refresh();
    };
    const handleEdit = () => {
      setItem(item.name.trim());
      setItemID(item.id);
      setIsEditing(true);
    };
    return (
      <Chip onClose={handleDelete} closeIcon="close">
        <Pressable style={{flexDirection: 'row'}} onLongPress={handleEdit}>
          <Text>{item.name}</Text>
        </Pressable>
      </Chip>
    );
  };
  return (
    <>
      <TextInput
        placeholder="Type something"
        value={item}
        onChangeText={text => setItem(text)}
        onSubmitEditing={handleAddItem}
      />
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        contentContainerStyle={{gap: 10}}
      />
    </>
  );
};

export default ChipContainer;

const styles = StyleSheet.create({});
