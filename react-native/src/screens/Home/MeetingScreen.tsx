import React, {useCallback, useRef} from 'react';

import {JitsiMeeting} from '@jitsi/react-native-sdk/index';

import {useNavigation} from '@react-navigation/native';


interface MeetingProps {
  route: any;
}

const MeetingScreen = ({route}: MeetingProps) => {
  const jitsiMeeting = useRef(null);
  const navigation = useNavigation();

  const { room } = route.params;

  const onReadyToClose = useCallback(() => {
    // @ts-ignore
    navigation.navigate('HomeScreen');
    // @ts-ignore
    jitsiMeeting.current.close();
  }, [navigation]);

  const eventListeners = {
    onReadyToClose
  };
  

  return (
      // @ts-ignore
      <JitsiMeeting
          eventListeners={eventListeners as any}
          ref={jitsiMeeting}
          style={{flex: 1}}
          room={room}
          serverURL={'https://meet.scoskun.info/'} />
  )
};

export default MeetingScreen;
