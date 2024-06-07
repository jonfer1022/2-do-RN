import {StyleSheet} from 'react-native';
import {
  backgroundContainer,
  primaryAction,
  textPrimary,
  textWarning,
} from '../../utils/styles/colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundContainer,
    paddingBottom: 0,
  },
  scrollContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: backgroundContainer,
  },
});

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
