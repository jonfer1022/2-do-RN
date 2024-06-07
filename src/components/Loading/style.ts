import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  indicator: {
    transform: [{scaleX: 2}, {scaleY: 2}],
  },
});
