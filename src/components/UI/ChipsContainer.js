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
const ChipsContainer = ({
  items,
  setItems,
  itemName,
  setItemName,
  itemID,
  setItemID,
  isEditing,
  setIsEditing,
  clearStates,
}) => {
  const [visible, setVisible] = useState(null);
  const openMenu = () => setVisible(null);
  const closeMenu = () => setVisible(null);

  const handleEditItem = id => {
    const item = items.find(item => item.id == id);
    setIsEditing(true);
    setItemName(item.name);
    setItemID(id);
  };
  const handleDeleteItem = id => {
    const updatedItem = items.filter(item => item.id !== id);
    setItems(updatedItem);
    clearStates();
  };

  const handleChipEdit = id => {
    handleEditItem(id);
    closeMenu();
  };
  const handleChipDelete = id => {
    handleDeleteItem(id);
  };

  return (
    <View style={styles.chipContainer}>
      {items?.map((item, index) => (
        <Menu
          key={index}
          visible={visible == item.id}
          onDismiss={closeMenu}
          anchor={
            <Chip mode="flat" onPress={() => setVisible(item.id)}>
              {item.name}
            </Chip>
          }>
          <Menu.Item onPress={() => handleChipEdit(item.id)} title="Edit" />
          <Divider />
          <Menu.Item onPress={() => handleChipDelete(item.id)} title="Delete" />
        </Menu>
      ))}
    </View>
  );
};

export default ChipsContainer;

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
