import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, } from "react-native";
import { Asset } from "expo-asset";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, ResizeMode, Video, } from "expo-av";
import * as Font from "expo-font";
import Slider from "@react-native-community/slider";
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import * as MusicsModel from '../firestore/MusicsModel'

import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 

const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";

export default function MusicScreen({route}) {
  const navigation = useNavigation();

  const [title, setTitle] = useState(route.params.title ? route.params.title : '')
  const [music, setMusic] = useState(route.params.music)
  const [index, setIndex] = useState(route.params.music_idx)
  
  const video               = useRef(null);
  const [status, setStatus] = useState({});
  const [originStatus, setOriginStatus] = useState(null);

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
    } catch (error) {
      console.error(error)
    }
  }, [])

  const seekPosition = () => {
    // console.log(status.positionMillis / status.durationMillis)
    // console.log(status.durationMillis)
    if ( video != null && status.positionMillis != null && status.durationMillis != null ) {
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

  const onBackward = () => {
    if (trackIndex !== 0) {
      setIndex(index-1)
    } else {
      setIndex(music.length()-1)
    }
  }
  const onForward = () => {
    if (trackIndex !== music.length()-1) {
      setIndex(index+1)
    } else {
      setIndex(0)
    }
  }
  const onShuffle = () => {
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
    var newMusicList = shuffle(music)
    setMusic(newMusicList)
    video.current.pauseAsync()
    video.current.setStatusAsync(originStatus)
    video.current.setStatusAsync({source: { uri: music[index].uri }})
    video.current.playAsync()
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
  
  const onBackButton = () => {
    const params = route.params
    navigation.navigate( params.from, {
      from  : params.from_parent, 
      type  : params.from_type, 
      id    :  params.from_id
    })
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
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            onLoadStart={()=> console.log(`ON LOAD START`)}
            onLoad={(status) => {console.log(`ON LOAD : ${JSON.stringify(status)}`); if (originStatus == null) {setOriginStatus(status)}}}
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
            {/* <Text style={{fontSize: 18, color: 'white'}}>{this.state.isBuffering ? BUFFERING_STRING : ""}</Text> */}
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
          {/* <TouchableOpacity onPress={() => this._onLoopPressed()} >
            { (this.state.loopingType)?
              <Ionicons name="infinite" size={66} color="white" />:
              <Ionicons name="infinite" size={66} color="gray" />}
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
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
