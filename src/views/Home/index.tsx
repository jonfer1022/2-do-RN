/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Loading,
  ModalAddNewTask,
  ModalRemoveTask,
  ModalUpdateTask,
  SubTittle,
  Tittle1,
} from '../../components';
import {style} from './style';
import {Pressable, SafeAreaView, ScrollView, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {primaryAction} from '../../utils/styles/colors';
import axiosInstance from '../../utils/axios/fetcher';
import {NewTask, TTask} from '../../utils/types/tasks.type';
import moment from 'moment';
import CardTask from '../../components/CardTask';

interface IGetTasks {
  overdue: TTask[];
  today: TTask[];
  tomorrow: TTask[];
  nextDays: TTask[];
}

const Home = () => {
  const [overdue, setOverdue] = useState<TTask[]>([]);
  const [today, setToday] = useState<TTask[]>([]);
  const [tomorrow, setTomorrow] = useState<TTask[]>([]);
  const [nextDays, setNextDays] = useState<TTask[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [task, setTask] = useState<TTask>({} as TTask);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const {data} = await axiosInstance.get<IGetTasks>('/tasks');
      setOverdue(data.overdue || []);
      setToday(data.today || []);
      setTomorrow(data.tomorrow || []);
      setNextDays(data.nextDays || []);
    } catch (error) {
      console.log('-----> ~ getTasks ~ error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewTask = async (data: NewTask) => {
    try {
      setLoading(true);
      const startDate = moment(`${data.date} ${data.startTime}`);
      const endDate = moment(`${data.date} ${data.endTime}`);
      setModalVisible(false);
      await axiosInstance.post('/tasks', {
        tittle: data.tittle,
        description: data.description,
        startDate,
        endDate,
        frequency: data.frequency,
        isPriority: data.isPriority,
        isDone: false,
      });
      getTasks();
    } catch (error) {
      console.log('-----> ~ handleNewTask ~ error:', error);
      setLoading(false);
    }
  };

  const handleUpdateTask = async (data: TTask) => {
    try {
      setLoading(true);
      setModalUpdateVisible(false);
      await axiosInstance.put(`/tasks/${data.id}`, {...data});
      getTasks();
    } catch (error) {
      console.log('-----> ~ handleUpdateTask ~ error:', error);
      setLoading(false);
    }
  };

  const handleDeleteTask = async (data: TTask) => {
    try {
      setLoading(true);
      setModalDeleteVisible(false);
      await axiosInstance.delete(`/tasks/${data.id}`);
      getTasks();
    } catch (error) {
      console.log('-----> ~ handleDeleteTask ~ error:', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={style.scrollContainer}>
        {overdue.length > 0 ? (
          <>
            <Tittle1 title={'Overdue'} style={{marginVertical: 10}} />
            {overdue.map((item: TTask) => (
              <CardTask
                key={item.id}
                item={item}
                isOverdue={true}
                changeStatus={(status: boolean, item: TTask) =>
                  handleUpdateTask({...item, isDone: status})
                }
                editTask={(item: TTask) => {
                  setTask(item);
                  setModalUpdateVisible(true);
                }}
                removeTask={(item: TTask) => {
                  setTask(item);
                  setModalDeleteVisible(true);
                }}
              />
            ))}
          </>
        ) : (
          <></>
        )}
        <Tittle1 title={'Today'} style={{marginVertical: 10}} />
        {today.length > 0 ? (
          today.map((item: TTask) => (
            <CardTask
              key={item.id}
              item={item}
              changeStatus={(status: boolean, item: TTask) =>
                handleUpdateTask({...item, isDone: status})
              }
              editTask={(item: TTask) => {
                setTask(item);
                setModalUpdateVisible(true);
              }}
              removeTask={(item: TTask) => {
                setTask(item);
                setModalDeleteVisible(true);
              }}
            />
          ))
        ) : (
          <SubTittle
            title={'No tasks for today yet'}
            style={{marginLeft: 10}}
          />
        )}
        <Tittle1 title={'Tomorrow'} style={{marginVertical: 10}} />
        {tomorrow.length > 0 ? (
          tomorrow.map((item: TTask) => (
            <CardTask
              key={item.id}
              item={item}
              changeStatus={(status: boolean, item: TTask) =>
                handleUpdateTask({...item, isDone: !status})
              }
              editTask={(item: TTask) => {
                setTask(item);
                setModalUpdateVisible(true);
              }}
              removeTask={(item: TTask) => {
                setTask(item);
                setModalDeleteVisible(true);
              }}
            />
          ))
        ) : (
          <SubTittle
            title={'No tasks for this day yet'}
            style={{marginLeft: 10}}
          />
        )}
        <Tittle1 title={'Next days'} style={{marginVertical: 10}} />
        {nextDays.length > 0 ? (
          nextDays.map((item: TTask) => (
            <CardTask
              key={item.id}
              item={item}
              isNextDays={true}
              changeStatus={(status: boolean, item: TTask) =>
                handleUpdateTask({...item, isDone: status})
              }
              editTask={(item: TTask) => {
                setTask(item);
                setModalUpdateVisible(true);
              }}
              removeTask={(item: TTask) => {
                setTask(item);
                setModalDeleteVisible(true);
              }}
            />
          ))
        ) : (
          <SubTittle
            title={'No tasks for the next days yet'}
            style={{marginLeft: 10}}
          />
        )}
        <View style={{height: 70}} />
      </ScrollView>
      <Pressable
        style={style.floatingButton}
        onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircleo" size={40} color={primaryAction} />
      </Pressable>
      <ModalAddNewTask
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleNewTask}
      />
      <ModalUpdateTask
        isVisible={modalUpdateVisible}
        onClose={() => setModalUpdateVisible(false)}
        task={task}
        onConfirm={e => {
          const startTime = moment(e.startDate).format('HH:mm');
          const endTime = moment(e.endDate).format('HH:mm');
          handleUpdateTask({
            ...task,
            ...e,
            startDate: moment(`${e.date} ${startTime}`),
            endDate: moment(`${e.date} ${endTime}`),
          });
        }}
      />
      <ModalRemoveTask
        isVisible={modalDeleteVisible}
        onClose={() => setModalDeleteVisible(false)}
        onConfirm={() => handleDeleteTask(task)}
      />
      <Loading isVisible={loading} />
    </SafeAreaView>
  );
};

export default Home;
