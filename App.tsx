import {StyleSheet, Platform} from 'react-native';
// import {Link} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider, useSelector} from 'react-redux';
import {NativeBaseProvider, Text} from 'native-base';
import {KeyboardAvoidingView} from 'react-native';
import LoginForm from './src/views/LoginForm';
import React from 'react';

import TaskList from './src/views/TaskList';
import Messages from './src/components/messages';
// import LoginForm from './src/views/LoginForm';
import {store} from './src/redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AboutScreen from './src/views/Aboutscreen';
import Routes from './src/routes';
// import {useSelector} from 'react-redux';

// const log = logger.createLogger();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}>
          <Routes />
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import * as React from "react";
// import { View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "./components/Homescreen";
// import AboutScreen from "./Component/AboutScreen";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="About" component={AboutScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
