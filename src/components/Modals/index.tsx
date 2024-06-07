/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Modal, Text, View} from 'react-native';
import {style} from './style';
import {Paragraph, Tittle1} from '../TextCustom';
import {InputButton, InputText} from '../InputText';
import {ButtonPrimary, ButtonReject} from '../Buttons';
import {Calendar} from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {
  backgroundPrimary,
  backgroundSecondary,
  textPrimary,
} from '../../utils/styles/colors';
import Checkbox from 'react-native-bouncy-checkbox';
import {NewTask, TTask} from '../../utils/types/tasks.type';
import moment from 'moment';

interface IModalBasicProps {
  isVisible: boolean;
  onClose: () => void;
}

interface IModalCalendarProps extends IModalBasicProps {
  onSelectDate: (date: string) => void;
}

interface IModalTimePickerProps extends IModalBasicProps {
  onSelectTime: (startTime: Date, endTime: Date) => void;
  _startTime?: Date;
  _endTime?: Date;
}

interface IModalAddNewTaskProps extends IModalBasicProps {
  onConfirm: (task: NewTask) => void;
}

interface IModalEditTaskProps extends IModalBasicProps {
  onConfirm: (task: Partial<TTask> & {date: Date | string}) => void;
  task: TTask;
}

interface IModalRemoveTaskProps extends IModalBasicProps {
  onConfirm: () => void;
}

const _frequency = [
  'No repeat',
  'Once a day',
  'Once a day (Mon-Fri)',
  'Once a week',
  'Once a month',
];

const formatHHmm = 'hh:mm A';

export const ModalTimePicker = ({
  isVisible,
  onClose,
  onSelectTime,
  _startTime,
  _endTime,
}: IModalTimePickerProps) => {
  const diffMinutes = 15;
  const currentDate = new Date();
  currentDate.setMinutes(
    diffMinutes * (Math.floor(currentDate.getMinutes() / diffMinutes) + 1),
  );
  const [startTime, setStartTime] = React.useState<Date>(currentDate);
  const [endTime, setEndTime] = React.useState<Date>(
    new Date(currentDate.getTime() + diffMinutes * 60000),
  );

  React.useEffect(() => {
    if (_startTime && _endTime) {
      setStartTime(_startTime);
      setEndTime(_endTime);
    }
  }, [_endTime, _startTime]);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={style.modalContainer}>
        <View style={style.modal}>
          <Tittle1 title={'Select Time'} style={style.tittle} />
          <Paragraph title={'Start Time'} style={style.paragraph} />
          <DatePicker
            style={{alignSelf: 'center'}}
            mode="time"
            date={startTime}
            theme="dark"
            minuteInterval={15}
            onDateChange={value => {
              const date = new Date(value);
              setStartTime(date);
              setEndTime(new Date(date.getTime() + diffMinutes * 60000));
            }}
          />
          <Paragraph title={'End Time'} style={style.paragraph} />
          <DatePicker
            style={{alignSelf: 'center'}}
            mode="time"
            date={endTime}
            theme="dark"
            onDateChange={setEndTime}
            minuteInterval={15}
            minimumDate={startTime}
          />
          <View style={style.buttonContainer}>
            <ButtonReject
              onPress={() => {
                setStartTime(new Date());
                setEndTime(new Date());
                onClose();
              }}
              title={'Close'}
              customStyle={{marginRight: 10}}
            />
            <ButtonPrimary
              disabled={startTime.getTime() >= endTime.getTime()}
              onPress={() => {
                onSelectTime(startTime, endTime);
                onClose();
              }}
              title={'Save'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const ModalCalendar = ({
  isVisible,
  onClose,
  onSelectDate,
}: IModalCalendarProps) => {
  const [date, setDate] = React.useState<string>('');
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={style.modalContainer}>
        <View style={style.modal}>
          <Tittle1 title={'Select Date'} style={style.tittle} />
          <Calendar
            onDayPress={day => setDate(day.dateString)}
            markedDates={{
              [date]: {
                selected: true,
                disableTouchEvent: true,
              },
            }}
          />
          <View style={style.buttonContainer}>
            <ButtonReject
              onPress={() => {
                setDate('');
                onClose();
              }}
              title={'Close'}
              customStyle={{marginRight: 10}}
            />
            <ButtonPrimary
              onPress={() => {
                onSelectDate(date);
                onClose();
              }}
              disabled={date === ''}
              title={'Save'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const ModalAddNewTask = ({
  isVisible,
  onClose,
  onConfirm,
}: IModalAddNewTaskProps) => {
  const [tittle, setTittle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [date, setDate] = React.useState<string>('');
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] =
    React.useState<boolean>(false);
  const [frequency, setFrequency] = React.useState<string>(_frequency[0]);
  const [isPriority, setIsPriority] = React.useState<boolean>(false);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={style.modalContainer}>
        <View style={style.modal}>
          <Tittle1 title={'Add New Task'} style={style.tittle} />
          <Paragraph title={'Title Task'} style={style.paragraph} />
          <InputText
            onChange={setTittle}
            value={tittle}
            placeholder={'Enter the task here'}
          />
          <Paragraph
            title={'Description Task (optional)'}
            style={style.paragraph}
          />
          <InputText
            onChange={setDescription}
            value={description}
            placeholder={"Enter the task's description here (optional)"}
          />
          <Paragraph title={'Date'} style={style.paragraph} />
          <InputButton
            value={date}
            placeholder={'Select Date'}
            onPress={() => setCalendarVisible(true)}
            icon={<AntDesign name="calendar" size={22} color={'white'} />}
          />
          <Paragraph title={'Time'} style={style.paragraph} />
          <InputButton
            value={
              startDate && endDate
                ? `${moment(startDate).format(formatHHmm)} - ${moment(
                    endDate,
                  ).format(formatHHmm)}`
                : ''
            }
            placeholder={'Select Time'}
            onPress={() => setTimePickerVisible(true)}
            icon={<AntDesign name="clockcircle" size={22} color={'white'} />}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 10}}>
              <Paragraph title={'Select frequency'} style={style.paragraph} />
              <SelectDropdown
                // dropdownStyle={styles.dropdownMenuStyle}
                data={_frequency}
                onSelect={selectedItem => setFrequency(selectedItem)}
                // defaultValueByIndex={8} // use default value by index or default value
                defaultValue={frequency} // use default value
                renderButton={(selectedItem, isOpen) => {
                  return (
                    <View style={style.buttonSelect}>
                      <Paragraph title={selectedItem} style={{flex: 1}} />
                      <FontAwesome
                        name={isOpen ? 'angle-up' : 'angle-down'}
                        color={'white'}
                        size={22}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      key={index}
                      style={{
                        ...style.listOptions,
                        ...(isSelected && {
                          backgroundColor: backgroundSecondary,
                        }),
                      }}>
                      <Text style={{color: textPrimary}}>{item}</Text>
                    </View>
                  );
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Paragraph title={'Add document (opt)'} style={style.paragraph} />
              <ButtonPrimary
                title={'Attach document'}
                onPress={() => console.log('add')}
                customStyle={{padding: 13}}
                disabled={true}
              />
            </View>
          </View>
          <Checkbox
            size={22}
            text="Set as priority"
            style={{marginBottom: 10}}
            unFillColor={backgroundSecondary}
            fillColor={backgroundPrimary}
            innerIconStyle={{borderWidth: 2}}
            isChecked={isPriority}
            textStyle={{color: textPrimary, textDecorationLine: 'none'}}
            onPress={() => setIsPriority(!isPriority)}
          />
          <View style={style.buttonContainer}>
            <ButtonReject
              title={'Cancel'}
              onPress={() => onClose()}
              customStyle={{marginRight: 10}}
            />
            <ButtonPrimary
              title={'Add Task'}
              disabled={tittle === '' || date === '' || !startDate || !endDate}
              onPress={() =>
                onConfirm({
                  tittle,
                  description,
                  date,
                  startTime: moment(startDate).format('HH:mm'),
                  endTime: moment(endDate).format('HH:mm'),
                  frequency,
                  isPriority,
                })
              }
            />
          </View>
          <ModalCalendar
            onSelectDate={setDate}
            isVisible={calendarVisible}
            onClose={() => setCalendarVisible(false)}
          />
          <ModalTimePicker
            onSelectTime={(_startTime, _endTime) => {
              setStartDate(_startTime);
              setEndDate(_endTime);
            }}
            isVisible={timePickerVisible}
            onClose={() => setTimePickerVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

export const ModalUpdateTask = ({
  isVisible,
  onClose,
  onConfirm,
  task,
}: IModalEditTaskProps) => {
  const [tittle, setTittle] = React.useState(task.name);
  const [description, setDescription] = React.useState(task.description);
  const [date, setDate] = React.useState(
    new Date(`${task.startDate}`).toDateString(),
  );

  const [startTime, setStartTime] = React.useState<Date>(
    new Date(`${task.startDate}` || new Date()),
  );

  const [endTime, setEndTime] = React.useState<Date>(
    new Date(`${task.endDate}` || new Date()),
  );

  const [frequency, setFrequency] = React.useState(_frequency[0]);
  const [isPriority, setIsPriority] = React.useState(task.isPriority);
  const [calendarVisible, setCalendarVisible] = React.useState(false);
  const [timePickerVisible, setTimePickerVisible] = React.useState(false);

  React.useEffect(() => {
    if (task) {
      setTittle(task.name);
      setDescription(task.description);
      task.startDate && setDate(moment(task.startDate).format('YYYY-MM-DD'));
      task.startDate && setStartTime(new Date(`${task.startDate}`));
      task.endDate && setEndTime(new Date(`${task.endDate}`));
      setIsPriority(task.isPriority);
    }
  }, [task]);

  const taskUpdate = {
    tittle,
    description,
    date,
    startTime: moment(startTime),
    endTime: moment(endTime),
    isPriority,
  };

  const currentTask = {
    tittle: task.name,
    description: task.description,
    date: task.startDate && moment(task.startDate).format('YYYY-MM-DD'),
    startTime: task.startDate && moment(task.startDate),
    endTime: task.endDate && moment(task.endDate),
    isPriority: task.isPriority,
  };

  const _startTime = moment(startTime || task.startDate || new Date()).format(
    'LT',
  );
  const _endTime = moment(endTime || task.endDate || new Date()).format('LT');

  const time = `${_startTime} - ${_endTime}`;

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={style.modalContainer}>
        <View style={style.modal}>
          <Tittle1 title={'Edit Task'} style={style.tittle} />
          <Paragraph title={'Title Task'} style={style.paragraph} />
          <InputText
            onChange={setTittle}
            value={tittle}
            placeholder={'Enter the task here'}
          />
          <Paragraph
            title={'Description Task (optional)'}
            style={style.paragraph}
          />
          <InputText
            onChange={setDescription}
            value={description}
            placeholder={"Enter the task's description here (optional)"}
          />
          <Paragraph title={'Date'} style={style.paragraph} />
          <InputButton
            value={date}
            placeholder={'Select Date'}
            onPress={() => setCalendarVisible(true)}
            icon={<AntDesign name="calendar" size={22} color={'white'} />}
          />
          <Paragraph title={'Time'} style={style.paragraph} />
          <InputButton
            value={time}
            placeholder={'Select Time'}
            onPress={() => setTimePickerVisible(true)}
            icon={<AntDesign name="clockcircle" size={22} color={'white'} />}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 10}}>
              <Paragraph title={'Select frequency'} style={style.paragraph} />
              <SelectDropdown
                disabled={true}
                dropdownStyle={{opacity: true ? 0.5 : 1}}
                data={_frequency}
                onSelect={selectedItem => setFrequency(selectedItem)}
                // defaultValueByIndex={8} // use default value by index or default value
                defaultValue={frequency} // use default value
                renderButton={(selectedItem, isOpen) => {
                  return (
                    <View
                      style={[style.buttonSelect, {opacity: true ? 0.5 : 1}]}>
                      <Paragraph title={selectedItem} style={{flex: 1}} />
                      <FontAwesome
                        name={isOpen ? 'angle-up' : 'angle-down'}
                        color={'white'}
                        size={22}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      key={index}
                      style={{
                        ...style.listOptions,
                        ...(isSelected && {
                          backgroundColor: backgroundSecondary,
                        }),
                      }}>
                      <Text style={{color: textPrimary}}>{item}</Text>
                    </View>
                  );
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Paragraph title={'Add document (opt)'} style={style.paragraph} />
              <ButtonPrimary
                title={'Attach document'}
                onPress={() => console.log('add')}
                customStyle={{padding: 13}}
                disabled={true}
              />
            </View>
          </View>
          <Checkbox
            size={22}
            text="Set as priority"
            style={{marginBottom: 10}}
            unFillColor={backgroundSecondary}
            fillColor={backgroundPrimary}
            innerIconStyle={{borderWidth: 2}}
            isChecked={isPriority}
            textStyle={{color: textPrimary, textDecorationLine: 'none'}}
            onPress={() => setIsPriority(!isPriority)}
          />
          <View style={style.buttonContainer}>
            <ButtonReject
              title={'Cancel'}
              onPress={() => onClose()}
              customStyle={{marginRight: 10}}
            />
            <ButtonPrimary
              title={'Update Task'}
              disabled={
                tittle === '' ||
                date === '' ||
                !startTime ||
                !startTime ||
                JSON.stringify(currentTask) === JSON.stringify(taskUpdate)
              }
              onPress={() =>
                onConfirm({
                  name: tittle,
                  description,
                  startDate: new Date(startTime),
                  endDate: new Date(endTime),
                  date: date,
                  // frequency,
                  isPriority,
                })
              }
            />
          </View>
          <ModalCalendar
            onSelectDate={setDate}
            isVisible={calendarVisible}
            onClose={() => setCalendarVisible(false)}
          />
          <ModalTimePicker
            onSelectTime={(startDate, endDate) => {
              setTimePickerVisible(false);
              setStartTime(startDate);
              setEndTime(endDate);
            }}
            _startTime={
              startTime
                ? new Date(`${startTime}`)
                : new Date(`${task.startDate}`)
            }
            _endTime={
              endTime ? new Date(`${endTime}`) : new Date(`${task.endDate}`)
            }
            isVisible={timePickerVisible}
            onClose={() => setTimePickerVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

export const ModalRemoveTask = ({
  isVisible,
  onClose,
  onConfirm,
}: IModalRemoveTaskProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={style.modalContainer}>
        <View style={style.modal}>
          <Paragraph
            title={'Are you sure you want to delete this task?'}
            style={style.paragraph}
          />
          <View style={style.buttonContainer}>
            <ButtonReject
              title={'Cancel'}
              onPress={() => onClose()}
              customStyle={{marginRight: 10}}
            />
            <ButtonPrimary title={'Delete'} onPress={() => onConfirm()} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface IModalSearchProps {
  text: string;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (filter: {
    textToSearch?: string;
    priority?: string;
    status?: string;
    date?: string | null;
    time?: string | null;
  }) => void;
}

export const ModalSearch = ({
  text,
  isVisible,
  onClose,
  onConfirm,
}: IModalSearchProps) => {
  const priorityArray = ['By default', 'By priority', 'Not priority'];
  const statusArray = ['By default', 'Done', 'Not done'];
  const [textToSearch, setToSearch] = useState<string>('');
  const [priority, setPriority] = useState<string>(priorityArray[0]);
  const [status, setStatus] = useState<string>(statusArray[0]);
  // const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [date, setDate] = useState<string | null>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const time = '';

  useEffect(() => {
    setToSearch(text || '');
  }, [text]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={style.modalContainer}>
        <View style={style.modal}>
          <Tittle1 title={'Filter By'} style={style.tittle} />
          <Paragraph title={'Has the words'} style={style.paragraph} />
          <InputText
            placeholder="Search"
            value={textToSearch}
            onChange={setToSearch}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 5}}>
              <Paragraph title={'Priority'} style={style.paragraph} />
              <SelectDropdown
                // dropdownStyle={styles.dropdownMenuStyle}
                data={priorityArray}
                onSelect={selectedItem => setPriority(selectedItem)}
                // defaultValueByIndex={8} // use default value by index or default value
                defaultValue={priority} // use default value
                renderButton={(selectedItem, isOpen) => {
                  return (
                    <View style={style.buttonSelect}>
                      <Paragraph title={selectedItem} style={{flex: 1}} />
                      <FontAwesome
                        name={isOpen ? 'angle-up' : 'angle-down'}
                        color={'white'}
                        size={22}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      key={index}
                      style={{
                        ...style.listOptions,
                        ...(isSelected && {
                          backgroundColor: backgroundSecondary,
                        }),
                      }}>
                      <Text style={{color: textPrimary}}>{item}</Text>
                    </View>
                  );
                }}
              />
            </View>
            <View style={{flex: 1, marginLeft: 5}}>
              <Paragraph title={'Status'} style={style.paragraph} />
              <SelectDropdown
                // dropdownStyle={styles.dropdownMenuStyle}
                data={statusArray}
                onSelect={selectedItem => setStatus(selectedItem)}
                // defaultValueByIndex={8} // use default value by index or default value
                defaultValue={status} // use default value
                renderButton={(selectedItem, isOpen) => {
                  return (
                    <View style={style.buttonSelect}>
                      <Paragraph title={selectedItem} style={{flex: 1}} />
                      <FontAwesome
                        name={isOpen ? 'angle-up' : 'angle-down'}
                        color={'white'}
                        size={22}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      key={index}
                      style={{
                        ...style.listOptions,
                        ...(isSelected && {
                          backgroundColor: backgroundSecondary,
                        }),
                      }}>
                      <Text style={{color: textPrimary}}>{item}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 5}}>
              <Paragraph title={'Date from'} style={style.paragraph} />
              <InputButton
                value={date || 'By default'}
                placeholder={'Select Date'}
                onPress={() => setCalendarVisible(true)}
                icon={<AntDesign name="calendar" size={22} color={'white'} />}
              />
            </View>
            <View style={{flex: 1, marginLeft: 5}}>
              <Paragraph title={'Date to'} style={style.paragraph} />
              <InputButton
                value={date || 'By default'}
                placeholder={'Select Date'}
                onPress={() => setCalendarVisible(true)}
                icon={<AntDesign name="calendar" size={22} color={'white'} />}
              />
            </View>
          </View>
          <Paragraph title={'Time between'} style={style.paragraph} />
          <InputButton
            value={time}
            placeholder={'Select Time'}
            onPress={() => setTimePickerVisible(true)}
            icon={<AntDesign name="clockcircle" size={22} color={'white'} />}
          />
          <View style={style.buttonContainer}>
            <ButtonReject
              title={'Cancel'}
              onPress={() => onClose()}
              customStyle={{marginRight: 10}}
            />
            <ButtonPrimary
              title={'Accept'}
              onPress={() =>
                onConfirm({
                  textToSearch,
                  priority,
                  status,
                  date,
                  time,
                })
              }
              customStyle={{marginLeft: 10}}
            />
          </View>
        </View>
      </View>
      <ModalCalendar
        onSelectDate={setDate}
        isVisible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
      />
      <ModalTimePicker
        onSelectTime={(startDate, endDate) => {
          console.log(
            '-----> ~ ModalSearch ~ startDate, endDate:',
            startDate,
            endDate,
          );
          setTimePickerVisible(false);
          // setStartTime(startDate);
          // setEndTime(endDate);
        }}
        _startTime={
          new Date()
          // startTime
          //   ? new Date(`${startTime}`)
          //   : new Date(`${task.startDate}`)
        }
        _endTime={new Date()}
        isVisible={timePickerVisible}
        onClose={() => setTimePickerVisible(false)}
      />
    </Modal>
  );
};
