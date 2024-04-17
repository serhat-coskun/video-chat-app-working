// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import { timeout } from "@config/index";


const SplashScreen = ( ) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
    }, timeout.splashScreenMaxLoadTime);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/image/TLogo.png')}
        style={{width: '80%', resizeMode: 'contain', margin: 20, flex: 1, borderRadius: 50}}
      />
      <ActivityIndicator
        animating={true}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
    flex: 0, 
    marginVertical: 20 
  },
});