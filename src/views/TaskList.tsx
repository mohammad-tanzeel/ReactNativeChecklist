/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Checkbox from 'react-native-check-box';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';

function TaskList(): JSX.Element {
  const [isSelected, setSelection] = useState(false);
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);

  const init = async () => {
    const oldList = await AsyncStorage.getItem('checkList');
    console.info('oldList', oldList);
    setList(JSON.parse(oldList ?? '[]'));
  };

  useEffect(() => {
    init();
  }, []);
  const save = async () => {
    try {
      await AsyncStorage.setItem('checkList', JSON.stringify(list));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  const handelChange = (value: any, index) => {
    console.log(value);
    const newList = list.map((item, i) => {
      return {
        ...item,
        ...(i === index && {task: value}),
      };
    });
    setList(newList);
    save();
  };
  const handelCheck = (value: any, index) => {
    console.log(value);
    const newList = list.map((item, i) => {
      return {
        ...item,
        ...(i === index && {isChecked: value}),
      };
    });
    setList(newList);
    save();
  };
  const showAlert = () => {
    setList([...list, {isChecked: false, task: ''}]);
    //list.push({isChecked: true, task: 'Third task'});
    console.log('Data');
    save();
    // Alert.alert(list);
    //  Alert.alert('onPress Called...');
  };
  return (
    <View style={styles.root}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.Container}>
          <View style={{flexDirection: 'row'}}>
            <Text>Check List14</Text>
          </View>
          <TouchableOpacity
            style={{position: 'absolute', bottom: 15, right: 15}}
            onPress={showAlert}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 32,
                backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>+</Text>
            </View>
          </TouchableOpacity>
          {list.map((item, index) => {
            return (
              <View style={{flexDirection: 'row', marginTop: 20}} key={index}>
                <CheckBox
                  value={item.isChecked}
                  onValueChange={value => handelCheck(value, index)}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Task"
                  placeholderTextColor="#9a73ef"
                  autoCapitalize="none"
                  onChangeText={message => setMessage(message)}
                  style={styles.input}
                  value={item.task}
                  onChange={value => handelChange(value, index)}
                />
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    margin: 4,
    padding: 4,
  },
  Container: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
  },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  checkbox: {
    alignSelf: 'center',
  },
  input: {
    color: '#555555',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    height: '100%',

    borderWidth: 0,

    alignSelf: 'center',
    backgroundColor: '#fff0',
    width: 200,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TaskList;
