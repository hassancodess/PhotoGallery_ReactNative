import Toast from 'react-native-toast-message';

export const showToast = (msg, type = 'success') => {
  Toast.show({
    type: type,
    text1: msg,
    visibilityTime: 1500,
  });
};

// export const showToast = (msg, type = 'success') => {
//   const toast = useToast();
//   if (type != 'error') toast.show(msg, {type: type, placement: 'bottom'});
//   else toast.show(msg, {type: 'danger', placement: 'bottom'});
// };
