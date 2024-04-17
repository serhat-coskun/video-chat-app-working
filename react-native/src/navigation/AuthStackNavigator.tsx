import { createStackNavigator } from '@react-navigation/stack';

import { AuthStackParamList } from "@types_lib/navigationTypes";
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';



const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}


export default AuthStackNavigator;