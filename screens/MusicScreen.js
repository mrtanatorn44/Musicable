import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, } from "react-native";
import { Asset } from "expo-asset";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, ResizeMode, Video, } from "expo-av";
import * as Font from "expo-font";
import Slider from "@react-native-community/slider";
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import * as MusicsModel from '../firestore/MusicsModel'
import * as Notifications from 'expo-notifications';

import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";

export default function MusicScreen({route}) {
  const navigation = useNavigation();

  const [title, setTitle] = useState(route.params.title ? route.params.title : '')
  const [music, setMusic] = useState(route.params.music)
  const [index, setIndex] = useState(route.params.music_idx)
  const [isLoop, setIsLoop] = useState(false)
  const video               = useRef(null);
  const [status, setStatus] = useState({});
  const [originStatus, setOriginStatus] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    try {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeIOS.DuckOthers,
        playThroughEarpieceAndroid: false,
      });

      // noti
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    } catch (error) {
      console.error(error)
    }
  }, [])

  const seekPosition = () => {
    // console.log(status.positionMillis / status.durationMillis)
    // console.log(status.durationMillis)
    if ( video != null && status.positionMillis != null && status.durationMillis != null ) {
      if (status.positionMillis == status.durationMillis) {
        if (isLoop) {
          onReplay()
        } else {
          onForward()
        }
      }
      return ( status.positionMillis / status.durationMillis );
    }
    return 0;
  }
  const seekComplete = (value) => {
    if (video != null) {
      var newSeekPos = value * status.durationMillis
      // console.log(newSeekPos)
      video.current.setStatusAsync({positionMillis: newSeekPos})
    }
  }

  const onReplay = async () => {
    await video.current.setStatusAsync({positionMillis : 0})
  }
  const onBackward = async () => {
    if (index !== 0) {
      await video.current.unloadAsync();
      setIndex(index-1)
      await video.current.setStatusAsync(originStatus)
      await video.current.playAsync()
    } else {
      await video.current.unloadAsync();
      setIndex(music.length-1)
      await video.current.setStatusAsync(originStatus)
      await video.current.playAsync()
    }
  }
  const onForward = async () => {
    if (index !== music.length-1) {
      await video.current.unloadAsync();
      setIndex(index+1)
      await video.current.setStatusAsync(originStatus)
      await video.current.playAsync()
    } else {
      await video.current.unloadAsync();
      setIndex(0)
      await video.current.setStatusAsync(originStatus)
      await video.current.playAsync()
    }
  }
  const onShuffle = async () => {
    const shuffle = (array) => {
      let currentIndex = array.length,  randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    }

    await video.current.unloadAsync();
    var newMusicList = shuffle(music)
    setMusic(newMusicList)
    await video.current.setStatusAsync(originStatus)
    await video.current.playAsync()

    let toast = Toast.show('Shuffled playlist', {duration: Toast.durations.SHORT, backgroundColor: 'gray'});
  }
  // console.log(route.params.music)
  // console.log(music[index])
  // setPlaylist(playlist => ({
  //   ...playlist, 
  //   ...{
  //     liked : 5233492,
  //     label : 'Featuring',
  //     music : musicFromFirebase
  //   }
  // }))
  
  const onBackButton =  () => {
    const params = route.params
    navigation.navigate( params.from, {
      from  : params.from_parent, 
      type  : params.from_type, 
      name    :  params.from_name
    })
  }

  const onStatusUpdate = (vidStatus) => {
    setStatus(vidStatus)
   
  }
  // Utility Function
  const getPlaytime = () => {
    const getTimeFormat = (time) => {
      var minute = String(Math.floor(time/60))
      var second = String(Math.floor(time%60)).length == 1 ? '0' + String(Math.floor(time%60)) : String(Math.floor(time%60))
      return  minute + ':' + second
    }
    if ( video != null && status.positionMillis != null && status.durationMillis != null ) {
      return getTimeFormat(status.positionMillis/1000) + ' / ' + getTimeFormat(status.durationMillis/1000);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Loading Modal */}
      { status.isLoading &&
      <View style={styles.loading}>
        <Text style={{fontSize: 64, color: 'white'}}>Loading...</Text>
      </View>
      }
      {/* CONTENT */}
      <View style={styles.content}>
        {/* Top Panel */}
        <View style={{marginVertical: '3%', width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => onBackButton()}>
            <MaterialIcons style={{textAlign: 'left'}} name="keyboard-arrow-left" size={32} color="white" />
          </TouchableOpacity>
          <Text style={{fontSize: 24, color: 'white'}} numberOfLines={1}>{title}</Text>
          <Text style={{fontSize: 18, color: 'white'}}></Text>
        </View>
        {/* Music Image */}
        <View style={{height: '50%', backgroundColor: 'red'}}>
          <Image style={{height: '100%', width: '100%'}} source={{ uri: music[index].image}}/>
          <Video
            ref={video}
            onPlaybackStatusUpdate={status => onStatusUpdate(status)}
            onLoadStart={()=> console.log(`ON LOAD START`)}
            onLoad={(status) => {console.log(`ON LOAD : ${JSON.stringify(status)}`); if (originStatus == null) {setOriginStatus(status)};
            async () => {
              await schedulePushNotification();
            }}}
            onError={(error) => console.log(`ON ERROR : ${error}`)}
            source={{ uri: music[index].uri }}
          />
        </View>
        {/* Music Info */}
        <View style={{height: '10%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}} numberOfLines={1}>{music[index].name}</Text>
          <Text style={{fontSize: 18, color: 'white'}} numberOfLines={1}>{music[index].artist}</Text>
        </View>
        {/* Music Track */}
        <View style={{height: '10%', flexDirection: 'column'}}>
          <View style={{width: '100%', height: '50%', justifyContent: 'center'}}>
            <Slider
              // style={{backgroundColor: 'white'}}
              // trackImage={ICON_TRACK_1.module}
              // thumbImage={ICON_THUMB_1.module}
              value={seekPosition()}
              // onValueChange={seekPosition()}
              onSlidingComplete={value => seekComplete(value)} // when user release thumb (complete)
              minimumTrackTintColor='white'            
              maximumTrackTintColor='white'
              thumbTintColor='#1ED760'
            />
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 18, color: 'white'}}>{status.isBuffering ? BUFFERING_STRING : ""}</Text>
            <Text style={{fontSize: 18, color: 'white'}}>{getPlaytime()}</Text>
          </View>
        </View>
        {/* Music Panel */}
        <View style={{height: '20%', flexDirection: 'row',justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => onShuffle()}>
            <Ionicons name="shuffle"            size={66} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onBackward()} >
            <Ionicons name="play-skip-back"     size={66} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()} >
            { (status.isPlaying)? 
              <Ionicons name="pause" size={66} color="white" />:
              <Ionicons name="play"  size={66} color="white" />
            }
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => this._onStopPressed()} >
            <Ionicons name="stop" size={66} color="white" />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => onForward()} >
            <Ionicons name="play-skip-forward"  size={66} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLoop(!isLoop)} >
            { (isLoop)?
              <Ionicons name="infinite" size={66} color="white" />:
              <Ionicons name="infinite" size={66} color="gray" />}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1ED760'
  },
  content: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: '5%',
    paddingVertical: '10%'
  },

  textBold: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  text: {
    color: 'white',
    fontSize: 18,
  },

  loading: {
    position: 'absolute', 
    backgroundColor: 'black',
    opacity : 0.75, 
    width: '100%', 
    height: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
