import {StyleSheet} from 'react-native';
import {
  backgroundContainer,
  backgroundTertiary,
  primaryAction,
  textPrimary,
} from '../../utils/styles/colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundContainer,
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  codeFieldRoot: {
    marginTop: 50,
    marginBottom: 50,
  },
  cellContainer: {
    borderRadius: 10,
    width: 50,
    height: 70,
    backgroundColor: backgroundTertiary,
    borderColor: primaryAction,
    justifyContent: 'center',
  },
  cell: {
    width: '100%',
    height: '50%',
    fontSize: 30,
    textAlign: 'center',
    color: textPrimary,
    marginBottom: 5,
  },
  focusCell: {
    borderColor: 'white',
    borderWidth: 2,
  },
});
