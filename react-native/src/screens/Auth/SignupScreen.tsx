import React, {useState, createRef, RefObject} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import Loader from '@components/Loader';
import { useDispatch } from 'react-redux';
import { signup } from '@features/auth/authSlice';

import { AppDispatch } from "@app/store";
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from "@types_lib/navigationTypes";

type SingupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignupScreen'>;
type Props = {
  navigation: SingupScreenNavigationProp;
};

const SignupScreen: React.FC<Props> = (props) => {

  const dispatch = useDispatch<AppDispatch>();
  
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userAge, setUserAge] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errortext, setErrortext] = useState<string>('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState<boolean>(false);

  const emailInputRef: RefObject<TextInput> = createRef();
  const ageInputRef: RefObject<TextInput> = createRef();
  const addressInputRef: RefObject<TextInput> = createRef();
  const passwordInputRef: RefObject<TextInput> = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      Alert.alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!userAge) {
      Alert.alert('Please fill Age');
      return;
    }
    if (!userAddress) {
      Alert.alert('Please fill Address');
      return;
    }
    if (!userPassword) {
      Alert.alert('Please fill Password');
      return;
    }
    setLoading(true);
    var dataToSend = {
      username: userName,
      email: userEmail,
      password: userPassword,
    };

    dispatch(signup({username: userName, password: userPassword, email: userEmail}))
      .unwrap()
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if ("id" in responseJson) {
          setIsRegistrationSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          setErrortext("Registeration failed.");
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistrationSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('@assets/image/SignupSuccess.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('@assets/image/TLogo.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAge) => setUserAge(UserAge)}
              underlineColorAndroid="#f000"
              placeholder="Enter Age"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAddress) =>
                setUserAddress(UserAddress)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Address"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
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
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});