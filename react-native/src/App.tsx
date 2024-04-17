import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainStackNavigator from '@navigation/MainStackNavigator';
import AuthStackNavigator from '@navigation/AuthStackNavigator';
import SplashScreen from '@screens/SplashScreen';

import { AppDispatch } from "@app/store";
import { useSelector, useDispatch } from 'react-redux';
import { restoreToken, selectUserToken, selectIsLoading } from '@features/auth/authSlice';
import { timeout } from "@config/index";



function App() {

  const dispatch = useDispatch<AppDispatch>();
  const userToken = useSelector(selectUserToken);
  const isLoading = useSelector(selectIsLoading);
  

  useEffect(() => {

    // Set up the timeout to dispatch the action after the specified duration
    const timer = setTimeout(() => {
      dispatch(restoreToken());
    }, timeout.minAppStartingLogoDuration);
  }, [dispatch])

  if (isLoading) {
    return <SplashScreen />; 
  }

  return (
    <NavigationContainer>
      {userToken ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default App;
