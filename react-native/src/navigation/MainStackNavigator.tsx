import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList } from "@types_lib/navigationTypes";
import BottomTabNavigator from '@navigation/BottomTabNavigator';
import MeetingScreen from '@screens/Home/MeetingScreen';

const MainStack = createStackNavigator<MainStackParamList>();


function MainStackNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <MainStack.Screen name="MeetingScreen" component={MeetingScreen} />
    </MainStack.Navigator>
  );
}


export default MainStackNavigator;