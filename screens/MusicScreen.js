import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
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
      duration: 372 // Duration in seconds
    },
    {
      name: 'Rap God 2',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
      duration: 372 // Duration in seconds
    },
    {
      name: 'Rap God 3',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
      duration: 372 // Duration in seconds
    },
    {
      name: 'Rap God 4',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
      duration: 372 // Duration in seconds
    }
  ]
}


export default function MusicScreen ({route}) {
  const navigation = useNavigation();
  const [playMusic, setPlayMusic] = useState(false);
  const [repeatMusic, setReapeatMusic] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  // const [sound, setSound] = React.useState();
  const [duration, setDuration] = useState(0);

  const sound = new Audio.Sound();

  async function onPlayMusic() {
    console.log('Loading Sound');
    // const { sound, status } = await Audio.Sound.createAsync({ uri: playlistData.songs[trackIndex].url });
    await sound.loadAsync({ uri: playlistData.songs[trackIndex].url });
    await sound.playAsync();
    // const interval = setInterval(() => {
    //   // setDuration(status.positionMillis)
    //   console.log(status.positionMillis)
    // }, 1000);
    // setDuration(sound.getStatusAsync().then((status) => status.durationMillis))
    // setSound(sound);
    // setDuration(status)
    // console.log(status.positionMillis)
    console.log('Playing Sound');
    // await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(console.log(sound.getStatusAsync().then((status) => status.durationMillis)));

  }


  async function onStopMusic() {
    console.log('Stop Sound');
    await sound.unloadAsync();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (playMusic) {
      console.log('Start music')
      onPlayMusic()
    } else {
      console.log('Stop music')
      onStopMusic()
    }
  }, [playMusic])

  useEffect(() => {
    if (playMusic) {
      onStopMusic()
      onPlayMusic()
    }
    
  }, [trackIndex])
  const prevSong = () => {
    if (trackIndex !== 0) {
      setTrackIndex(trackIndex-1)
    }
  }
  const nextSong = () => {
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
          <View style={{backgroundColor: 'white', width: '100%', height: '5%'}}></View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 18, color: 'white'}}>{duration}</Text>
            <Text style={{fontSize: 18, color: 'white'}}>2:40</Text>
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
