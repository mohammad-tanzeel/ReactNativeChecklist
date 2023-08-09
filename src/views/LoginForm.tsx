import React, {useState, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  // AsyncStorage,
} from 'react-native';
// Modules
// import {Controller, useForm} from 'react-hook-form';
// Components
// import SizedBox from './SizedBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SizedBox from '../components/SizedBox';
import Messages from '../components/messages';
import {useDispatch, useSelector} from 'react-redux';
import {SAVE_USER} from '../redux/actions';

// import {API_BASE_URL} from '@env';

function useStyles() {
  return StyleSheet.create({
    root: {
      backgroundColor: '#000000',
      flex: 1,
      justifyContent: 'center',
      margin: 4,
      padding: 4,
    },
    safeAreaView: {
      flex: 1,
      justifyContent: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'rgb(93, 95, 222)',
      borderRadius: 8,
      height: 48,
      justifyContent: 'center',
    },
    buttonTitle: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 22,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 32,
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
    },
    form: {
      alignItems: 'center',
      backgroundColor: 'rgb(58, 58, 60)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 16,
    },
    label: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
      width: 80,
    },

    subtitle: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
    },
    textButton: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
    },
    textInput: {
      color: '#FFFFFF',
      flex: 1,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
    },
    sampleBox: {
      alignItems: 'center',
      backgroundColor: '#ffff',
      borderRadius: 8,
      flexDirection: 'row',
      height: 48,
    },
    rows: {
      alignItems: 'center',
      backgroundColor: 'rgb(58, 58, 60)',
      borderRadius: 8,
      flexDirection: 'row',
      // height: 48,
      // paddingHorizontal: 0,
      paddingBottom: 10,
      paddingTop: 10,
    },
  });
}

function LoginForm({navigation}: any) {
  const dispatch = useDispatch();

  // const userProfile = useSelector((state: any) => state.userProfile);
  // console.log('userProfile', userProfile);
  // const [text, setText] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [screenMessage, setScreenMessage] = useState('');
  const [msgType, setMsgType] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const styles = useStyles();

  const onSubmit = async () => {
    //  console.log('email=', email, 'password=', password);
    try {
      const apiURL = 'http://10.245.53.206:3005/auth/login';
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password}),
      };
      console.log('requestOptions', requestOptions);
      const response = await fetch(apiURL, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.token) {
        AsyncStorage.setItem('userData', JSON.stringify(data));
        const userData = data.user;
        dispatch({type: SAVE_USER, ProfileData: userData});
        setApiResponse(data);
        navigation.navigate('TaskList');
        console.log(data.token);
      } else {
        setScreenMessage('Wrong Credential1');
        setMsgType('error');
      }
    } catch (err) {
      console.log('error=', err);
      setScreenMessage('Somthing Went Wrong');
      setMsgType('error');
    }
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        <SizedBox height={20} width={0} />

        <View style={styles.rows}>
          <Text
            style={{
              color: 'rgba(235, 235, 245, 0.6)',
              fontSize: 15,
              fontWeight: '400',
              lineHeight: 20,
              width: 80,
              marginStart: 10,
            }}>
            Email
          </Text>
          <TextInput
            style={{
              ...styles.sampleBox,
              backgroundColor: '#FFFFFF',
              flex: 1,
              borderRadius: 8,
            }}
            placeholder="Enter Email"
            onChangeText={value => setEmail(value)}
            value={email}
          />
        </View>
        <SizedBox height={20} width={0} />
        <View style={loginStyles.rows}>
          <Text
            style={{
              color: 'rgba(235, 235, 245, 0.6)',
              fontSize: 15,
              fontWeight: '400',
              lineHeight: 20,
              width: 80,
              marginStart: 10,
            }}>
            Password
          </Text>
          <TextInput
            placeholder="Enter Password"
            onChangeText={value => setPassword(value)}
            value={password}
            secureTextEntry
            style={{
              ...styles.sampleBox,
              backgroundColor: '#FFFFFF',
              flex: 1,
              borderRadius: 8,
            }}
          />
        </View>
        <SizedBox height={20} />
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(117 159 234)',
            alignItems: 'center',
            borderRadius: 8,
            height: 48,
            paddingTop: 20,
          }}
          onPress={onSubmit}>
          <View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 20,
              }}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
        <Messages message={screenMessage} megType={msgType} />
      </SafeAreaView>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  rows: {
    alignItems: 'center',
    backgroundColor: 'rgb(58, 58, 60)',
    borderRadius: 8,
    flexDirection: 'row',
    // height: 48,
    // paddingHorizontal: 0,
    paddingBottom: 10,
    paddingTop: 10,
  },
});
export default LoginForm;
