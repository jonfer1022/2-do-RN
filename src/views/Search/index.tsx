/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InputTextIcon, Loading} from '../../components';
import {style} from './style';
import {
  ModalRemoveTask,
  ModalSearch,
  ModalUpdateTask,
} from '../../components/Modals';
import {TTask} from '../../utils/types/tasks.type';
import axiosInstance from '../../utils/axios/fetcher';
import CardTask from '../../components/CardTask';
import moment from 'moment';
// import {useFocusEffect} from '@react-navigation/native';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [task, setTask] = useState<TTask>({} as TTask);

  const getTasks = async ({
    textToSearch = '',
    priority = '',
    status = '',
    date = '',
    time = '',
  }: {
    textToSearch?: string;
    priority?: string;
    status?: string;
    date?: string | null;
    time?: string | null;
  }) => {
    try {
      setLoading(true);
      let path = '/tasks?filter="true"';
      if (textToSearch.length) {
        path += `&textToSearch=${textToSearch}`;
      }
      if (priority.length) {
        path += `&priority=${priority}`;
      }
      if (status.length) {
        path += `&status=${status}`;
      }
      if (date) {
        console.log('-----> ~ Search ~ date:', date, time);
      }
      // if (_date.length) {
      //   path += `&date=${_date}`;
      // }
      // if (_time.length) {
      //   path += `&time=${_time}`;
      // }
      const {data} = await axiosInstance.get(path);
      setLoading(false);
      setTasks(data);
    } catch (error) {
      setLoading(false);
      console.log('-----> ~ getTasks ~ error:', error);
    }
  };

  const handleUpdateTask = async (data: TTask) => {
    try {
      setLoading(true);
      setModalUpdateVisible(false);
      await axiosInstance.put(`/tasks/${data.id}`, {...data});
      await getTasks({});
    } catch (error) {
      console.log('-----> ~ handleUpdateTask ~ error:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (data: TTask) => {
    try {
      setLoading(true);
      setModalDeleteVisible(false);
      await axiosInstance.delete(`/tasks/${data.id}`);
      await getTasks({});
    } catch (error) {
      console.log('-----> ~ handleDeleteTask ~ error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      const timeOutId = setTimeout(() => {
        getTasks({textToSearch: search});
      }, 400);
      return () => clearTimeout(timeOutId);
    } else {
      setTasks([]);
    }
  }, [search]);

  // useFocusEffect(() => {
  //   getTasks({});
  //   return () => {
  //     setSearch('');
  //   };
  // });

  return (
    <SafeAreaView style={style.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            justifyContent: 'center',
            marginRight: 10,
          }}>
          <Ionicons
            name="menu"
            size={30}
            color="white"
            onPress={() => setModalVisible(true)}
          />
        </View>
        <View style={{flex: 1}}>
          <InputTextIcon
            customStyle={{marginBottom: 0}}
            onChange={(text: string) => {
              setSearch(text);
              if (text === '') {
                setTasks([]);
              }
            }}
            value={search}
            placeholder={'Search by content'}
            icon={
              <View style={style.iconContainer}>
                <AntDesign name="search1" size={20} color="white" />
              </View>
            }
          />
        </View>
      </View>

      <ModalSearch
        text={search}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={filter => {
          setSearch(filter.textToSearch || '');
          setModalVisible(false);
          getTasks(filter);
        }}
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

      {tasks.length === 0 && search.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AntDesign name="carryout" size={80} color="white" />
        </View>
      ) : (
        tasks?.map((_task: TTask) => (
          <CardTask
            key={_task.id}
            item={_task}
            isSearching={true}
            changeStatus={(status: boolean, item: TTask) => {
              handleUpdateTask({...item, isDone: status});
            }}
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
      )}
      {loading && <Loading isVisible={loading} />}
    </SafeAreaView>
  );
};

export default Search;
