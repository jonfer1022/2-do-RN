import {StyleSheet} from 'react-native';
import {
  backgroundSecondary,
  backgroundTertiary,
  primaryAction,
} from '../../utils/styles/colors';

export const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modal: {
    backgroundColor: backgroundSecondary,
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  tittle: {
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonSelect: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: primaryAction,
    backgroundColor: backgroundTertiary,
    marginBottom: 10,
    flexDirection: 'row',
  },
  listOptions: {
    padding: 10,
    backgroundColor: backgroundTertiary,
  },
});
