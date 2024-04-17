import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryScreen from "@screens/HistoryScreen";
import MessageScreen from '@screens/MessageScreen';
import HomeScreen from '@screens/Home/HomeScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="HistoryScreen" component={HistoryScreen} />
      <Tab.Screen name="MessageScreen" component={MessageScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
