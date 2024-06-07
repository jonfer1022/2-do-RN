/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import moment from 'moment';
import {
  backgroundSecondary,
  colorWarning,
  primaryAction,
  textPrimary,
  textSecondary,
} from '../../utils/styles/colors';
import Checkbox from 'react-native-bouncy-checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TTask} from '../../utils/types/tasks.type';
import {styleCard} from './style';
import {SimpleCard} from '../Cards';
import {Paragraph} from '../TextCustom';
import {View} from 'react-native';

interface ICardTaskProps {
  item: TTask;
  changeStatus: (status: boolean, item: TTask) => void;
  editTask: (item: TTask) => void;
  removeTask: (item: TTask) => void;
  isNextDays?: boolean;
  isOverdue?: boolean;
  isSearching?: boolean;
}

const CardTask = ({
  item,
  isNextDays,
  isOverdue,
  changeStatus,
  editTask,
  removeTask,
  isSearching,
}: ICardTaskProps) => {
  const _styleCard = styleCard(isOverdue);
  let date = '';
  const startTime = moment(item.startDate || new Date()).format('LT');
  const endTime = moment(item.endDate || new Date()).format('LT');
  if (isSearching || isNextDays || isOverdue) {
    date = moment(item.startDate || new Date()).format('ddd, MMM DD, YYYY, ');
  }

  const time = `${date}${item.startDate && startTime} - ${
    item.endDate && endTime
  }`;

  return (
    <SimpleCard style={_styleCard.cardContainer}>
      <Paragraph title={item.name} />
      <Paragraph title={time} style={{color: textSecondary, marginTop: 3}} />
      {item.description ? (
        <View style={_styleCard.cardDescription}>
          <Paragraph
            title={'Description: '}
            style={{color: textPrimary, marginTop: 3}}
          />
          <Paragraph
            title={item.description}
            style={{color: textSecondary, marginTop: 3, flex: 1}}
          />
        </View>
      ) : (
        <></>
      )}
      {item.isPriority ? (
        <Paragraph title={'Priority'} style={{color: colorWarning}} />
      ) : (
        <></>
      )}
      <View style={_styleCard.cardFooter}>
        <View style={{flex: 1}}>
          <Checkbox
            size={22}
            text={`${item.isDone ? '¡Done!' : '¿Is it already done?'}`}
            style={{marginTop: 5}}
            unFillColor={backgroundSecondary}
            fillColor={primaryAction}
            innerIconStyle={{borderWidth: 2}}
            isChecked={item.isDone}
            textStyle={_styleCard.cardCheckbox}
            onPress={() => changeStatus(!item.isDone, item)}
          />
        </View>
        <View style={_styleCard.cardFooterIcon}>
          <FontAwesome
            name="edit"
            size={30}
            color={textSecondary}
            onPress={() => editTask(item)}
            style={{
              marginTop: 2,
              verticalAlign: 'middle',
            }}
          />
        </View>
        <View style={_styleCard.cardFooterIcon}>
          <FontAwesome
            name="trash-o"
            size={30}
            color={textSecondary}
            onPress={() => removeTask(item)}
          />
        </View>
      </View>
    </SimpleCard>
  );
};

export default CardTask;
