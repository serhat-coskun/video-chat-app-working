import React, {useState, useEffect} from 'react';
import {Button, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import { WebSocketApiService } from "@services/websocketApi";
import { AppDispatch } from '@app/store';
import { selectUserToken } from "@features/auth/authSlice"

import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from "@types_lib/navigationTypes";
import { screen } from '@jitsi/react-native-sdk/react/features/mobile/navigation/routes';
import { ResultAction, Response, MatchFoundResult } from "@services/websocketApiTypes";

type BottomTabNavigatorProp = StackNavigationProp<MainStackParamList, 'BottomTabNavigator'>;
type Props = {
  navigation: BottomTabNavigatorProp;
};

const HomeScreen: React.FC<Props>  = ({navigation}) => {

    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector(selectUserToken)


    useEffect(() => {
        // Establish websocket connection
        const ws = WebSocketApiService.getInstance(dispatch);
        ws.open();

        
        const timerId = setTimeout(() => {
            ws.authenticate(token);
        }, 2000); // Delay in milliseconds

    }, [token]);


    const onPressCallback = () => {
        
        const ws = WebSocketApiService.getInstance();
        const callbackForRequestRoom = (response: Response<any>) => {

            const msg  = response as Response<ResultAction.MATCH_FOUND>;
            

            console.log("Room id: " +  (msg.result as MatchFoundResult).room_id);
            
            if (msg.result !== null) {

                const room = (msg.result as MatchFoundResult).room_id;
                console.log(`MatchFoundResult room_id is ${room}`);
                navigation.navigate("MeetingScreen", {room});
            }else {
                console.error("room_id is null.");
            }
            
        }
        ws.requestRoom(callbackForRequestRoom);
        
    }


    return (
        <View style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
        }}>
            <Button
                color="blue"
                // @ts-ignore
                onPress={onPressCallback}
                // @ts-ignore
                style={{height: 32, width: 32}}
                title="Join" />
        </View>
    );
};

export default HomeScreen;
