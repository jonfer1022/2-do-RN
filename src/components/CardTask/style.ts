import {StyleSheet} from 'react-native';
import {
  primaryAction,
  textPrimary,
  textWarning,
} from '../../utils/styles/colors';

export const styleCard = (isOverdue?: boolean) => {
  return StyleSheet.create({
    cardContainer: {
      borderColor: isOverdue ? textWarning : primaryAction,
      borderWidth: isOverdue ? 1 : 0,
    },
    cardDescription: {
      marginTop: 3,
      flexDirection: 'row',
    },
    cardCheckbox: {
      color: textPrimary,
      textDecorationLine: 'none',
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      verticalAlign: 'middle',
    },
    cardFooterIcon: {
      marginLeft: 10,
    },
  });
};
