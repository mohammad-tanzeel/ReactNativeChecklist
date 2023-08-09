import {KeyboardAvoidingView, NativeBaseProvider} from 'native-base';
import {NativeScreenNavigationContainer} from 'react-native-screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LoginForm from './views/LoginForm';
import AboutScreen from './views/Aboutscreen';
import TaskList from './views/TaskList';

export default function Routes() {
  const userProfile = useSelector((state: any) => state.userProfile);
  console.log('userProfile on checklist', userProfile);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const user = userProfile;
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <NavigationContainer>
          {user ? (
            <Tab.Navigator>
              <Tab.Screen name="TaskList" component={TaskList} />
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="About" component={AboutScreen} />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="LoginForm">
              <Stack.Screen name="LoginForm" component={LoginForm} />
              <Stack.Screen name="TaskList" component={TaskList} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="LoginForm">
      <Stack.Screen name="TaskList" component={TaskList} />
      <Stack.Screen name="LoginForm" component={LoginForm} />
    </Stack.Navigator>
  );
};
