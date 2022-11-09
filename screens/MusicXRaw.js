import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { firebase } from "../firestore/Connect";

import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

import { Audio } from 'expo-av';

const playlistData = {
  name: 'TOP 2022 Playlist',
  songs: [
    {
      name: 'Rap God 1',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
    },
    {
      name: 'Rap God 2',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
    },
    {
      name: 'Rap God 3',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
    },
    {
      name: 'Rap God 4',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
    }
  ]
}

export default function MusicScreen ({route}) {
  const navigation = useNavigation();
  const [playMusic, setPlayMusic] = useState(false);
  const [repeatMusic, setReapeatMusic] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const playbackObject = new Audio.Sound();

  async function onPlayMusic() {
    console.log('Loading Sound');
    // const { sound, status } = await Audio.Sound.createAsync({ uri: playlistData.songs[trackIndex].url });
    await playbackObject.loadAsync({ uri: playlistData.songs[trackIndex].url });
    await playbackObject.playAsync();
    console.log('Playing Sound');

    playbackObject.getStatusAsync().then((status) => {
      setDuration(status.durationMillis/1000)
    })
  }

  async function onStopMusic() {
    console.log('Stop Sound');
    playbackObject.unloadAsync();
  }

  useEffect(() => {
    return playbackObject
      ? () => {
          // console.log('Unloading Sound');
          // playbackObject.unloadAsync();
        }
      : undefined;
  }, [playbackObject]);

  useEffect(() => {
    console.log('Play trigger : ' + String(playMusic))
    if (playMusic) {
      onPlayMusic()
    } else {
      onStopMusic()
    }
  }, [playMusic])

  useEffect(() => {
    if (playMusic) {
      onStopMusic()
      onPlayMusic()
    } else {
      console.log('Unloading Sound');
      // playbackObject.unloadAsync();
    }
  }, [trackIndex])

  const prevSong = () => {
    console.log("Prev Track")
    if (trackIndex !== 0) {
      setTrackIndex(trackIndex-1)
    }
  }
  const nextSong = () => {
    console.log("Next Track")
    if (trackIndex !== playlistData.songs.length-1) {
      setTrackIndex(trackIndex+1)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT */}
      <View style={styles.content}>
        {/* Top Panel */}
        <View style={{marginVertical: '3%', width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => navigation.navigate(route.params.fromPage)}>
            <MaterialIcons style={{textAlign: 'left'}} name="keyboard-arrow-left" size={32} color="white" />
          </TouchableOpacity>
          <Text style={{fontSize: 24, color: 'white'}} numberOfLines={1}>{playlistData.name}</Text>
          <Text style={{fontSize: 18, color: 'white'}}></Text>
        </View>
        {/* Music Image */}
        <View style={{height: '50%', backgroundColor: 'red'}}>
          <Image style={{height: '100%', width: '100%'}} source={{ uri: playlistData.songs[trackIndex].image}}/>
        </View>
        {/* Music Info */}
        <View style={{height: '10%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}} numberOfLines={1}>{playlistData.songs[trackIndex].name}</Text>
          <Text style={{fontSize: 18, color: 'white'}} numberOfLines={1}>{playlistData.songs[trackIndex].artist}</Text>
        </View>
        {/* Music Track */}
        <View style={{height: '10%', justifyContent: 'center', flexDirection: 'column'}}>
          <View style={{width: '100%', height: '5%'}}>
            <Slider
              minimumValue={0}
              maximumValue={7}
              minimumTrackTintColor="#1EB1FC"
              maximumTractTintColor="#1EB1FC"
              step={1}
              value={4}
              onValueChange={value => console.log(value)}
              style={styles.slider}
              thumbTintColor="#1EB1FC"
            />
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 18, color: 'white'}}>{getTimeFormat(position)} x</Text>
            <Text style={{fontSize: 18, color: 'white'}}>{getTimeFormat(duration)}</Text>
          </View>
        </View>
        {/* Music Panel */}
        <View style={{height: '20%', flexDirection: 'row',justifyContent: 'space-between'}}>
          <TouchableOpacity>
            <Ionicons name="shuffle"            size={66} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => prevSong()}>
            <Ionicons name="play-skip-back"     size={66} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setPlayMusic(!playMusic)}}>
            { (playMusic)?
              <Ionicons name="pause" size={66} color="white" />:
              <Ionicons name="play"  size={66} color="white" />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nextSong()}>
            <Ionicons name="play-skip-forward"  size={66} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setReapeatMusic(!repeatMusic)}>
            { (repeatMusic)?
              <Ionicons name="repeat" size={66} color="white" />:
              <Ionicons name="repeat"  size={66} color="gray" />}
          </TouchableOpacity>
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
});

function getTimeFormat(time) {
  var minute = String(Math.floor(time/60))
  var second = String(Math.floor(time%60)).length == 1 ? String(Math.floor(time%60)) + '0' : String(Math.floor(time%60))
  return  minute + ':' + second
}