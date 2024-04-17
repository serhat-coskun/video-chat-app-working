import React, {useState, createRef, RefObject} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import Loader from '@components/Loader';
import { AppDispatch } from "@app/store";
import { useDispatch } from 'react-redux';
import { login } from "@features/auth/authSlice";

import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from "@types_lib/navigationTypes";

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'LoginScreen'>;
type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props>  = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [userName, setUserName] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errortext, setErrortext] = useState<string>('');

  const passwordInputRef: RefObject<TextInput> = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    setLoading(true);
    if (!userName) {
      Alert.alert('Please fill Email');
      setLoading(false);
      return;
    }
    if (!userPassword) {
      Alert.alert('Please fill Password');
      setLoading(false);
      return;
    }
    
    dispatch(login({username: userName, password: userPassword}))
      .unwrap()
      .then((responseJson) => {
        if (responseJson !== undefined) {
          console.log(responseJson);
          
          if ("token" in responseJson) {
            console.log("Login successfull storing token");
          } else {
            setErrortext("Error when loging in");
            console.log('Please check your email id or password');
          }
        }
      })
      .catch((error) => {
        // Handle error if needed
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserName(UserEmail)
                }
                placeholder="Enter Email" 
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" 
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('SignupScreen')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});