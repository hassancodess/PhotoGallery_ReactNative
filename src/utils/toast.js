import Toast from 'react-native-toast-message';

export const showToast = (msg, type = 'success') => {
  Toast.show({
    type: type,
    text1: msg,
    visibilityTime: 2000,
  });
};
