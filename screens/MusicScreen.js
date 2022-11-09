import React, { useState, useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, } from "react-native";
import { Asset } from "expo-asset";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, ResizeMode, Video, } from "expo-av";
import * as Font from "expo-font";
import Slider from "@react-native-community/slider";
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 

var playlistData = {
  name: 'TOP 2022 Playlist',
  songs: [
    {
      name: 'Rap God 1',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
    },
    {
      name: 'Rap God 2',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
    },
    {
      name: 'Rap God 3',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
    },
    {
      name: 'Rap God 4',
      image : 'https://i.icanvas.com/TDR176?d=2&sh=s&p=1&bg=g&t=1623548545',
      artist: 'Eminem',
      uri: 'https://drive.google.com/uc?export=download&id=1u3jCoiDasVR4x2Ys419F1FA_PKLI3CKy', // Load media from the network
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
    }
  ]
}

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;

export default function(props) {
  const navigation = useNavigation();

  return <MusicScreen {...props} navigation={navigation} />;
}

class MusicScreen extends React.Component {

  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      playbackInstanceName: LOADING_STRING,
      loopingType: 0,
      muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      poster: false,
      useNativeControls: false,
      fullscreen: false,
      throughEarpiece: false,
    };
  }

  componentDidMount() {
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
    
  }

  async _loadNewPlaybackInstance(playing) {
    try {
      if (this.playbackInstance != null) {
        await this.playbackInstance.unloadAsync();
        // this.playbackInstance.setOnPlaybackStatusUpdate(null);
        this.playbackInstance = null;
      }
  
      const source = { uri: playlistData.songs[this.index].uri };
      const initialStatus = {
        shouldPlay: playing,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
        volume: this.state.volume,
        isMuted: this.state.muted,
        isLooping: this.state.loopingType === 1,
      };
      
      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      );
      this.playbackInstance = sound;
      this._updateScreenForLoading(false);
    } catch (error) {
      console.error(error)
    }
    
  }

  _mountVideo = (component) => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      this.setState({
        playbackInstanceName: playlistData.songs[this.index].name,
        isLoading: false,
      });
    }
  }

  _onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? 1 : 0,
        shouldCorrectPitch: status.shouldCorrectPitch,
      });
      if (status.didJustFinish && !status.isLooping) {
        this._advanceIndex(true);
        this._updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = (status) => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = (error) => {
    console.log(`ON ERROR : ${error}`);
  };

  _onReadyForDisplay = (event) => {
    const widestHeight =
      (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      this.setState({
        videoWidth:
          (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
          event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT,
      });
    } else {
      this.setState({
        videoWidth: DEVICE_WIDTH,
        videoHeight:
          (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width,
      });
    }
  };

  _onFullscreenUpdate = (event) => {
    console.log(
      `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
    );
  };

  _advanceIndex(forward) {
    this.index = (this.index + (forward ? 1 : playlistData.songs.length - 1)) % playlistData.songs.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(false);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onMutePressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  _onLoopPressed = () => {
    
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsLoopingAsync(
        this.state.loopingType !== 1
      );
      var loopingType;
      if (this.state.loopingType == 1) {
        loopingType = 'disable'
      } else if (this.state.loopingType == 0) {
        loopingType = 'enable'
      }
      let toast = Toast.show('Repeat current music ' + loopingType, {duration: Toast.durations.SHORT, backgroundColor: 'gray'});
    }
  };

  _onSeekSliderValueChange = (value) => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
      this.playbackInstance.playAsync();
    }
  };

  _onSeekSliderSlidingComplete = async (value) => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return "";
  }

  _shuffle() {
    this.shuffle(playlistData.songs)
    this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    let toast = Toast.show('Shuffled playlist', {duration: Toast.durations.SHORT, backgroundColor: 'gray'});
  }
  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  render() {
    const { navigation } = this.props;
    // console.log(this.props.route.params.form)
    const onBackButton = () => {
      const params = this.props.route.params
      navigation.navigate( params.from, 
        {
          from: params.from_parent, 
          type: params.from_type, 
          id:  params.from_id
        })
    }
    return (
      <SafeAreaView style={styles.container}>

      {/* Loading Modal */}
      { this.state.isLoading &&
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
          <Text style={{fontSize: 24, color: 'white'}} numberOfLines={1}>{playlistData.name}</Text>
          <Text style={{fontSize: 18, color: 'white'}}></Text>
        </View>
        {/* Music Image */}
        <View style={{height: '50%', backgroundColor: 'red'}}>
          <Image style={{height: '100%', width: '100%'}} source={{ uri: playlistData.songs[this.index].image}}/>
          <Video
            ref={this._mountVideo}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onError={this._onError}
          />
        </View>
        {/* Music Info */}
        <View style={{height: '10%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}} numberOfLines={1}>{playlistData.songs[this.index].name}</Text>
          <Text style={{fontSize: 18, color: 'white'}} numberOfLines={1}>{playlistData.songs[this.index].artist}</Text>
        </View>
        {/* Music Track */}
        <View style={{height: '10%', flexDirection: 'column'}}>
          <View style={{width: '100%', height: '50%', justifyContent: 'center'}}>
            <Slider
              // style={{backgroundColor: 'white'}}
              // trackImage={ICON_TRACK_1.module}
              // thumbImage={ICON_THUMB_1.module}
              value={this._getSeekSliderPosition()}
              onValueChange={this._onSeekSliderValueChange}
              onSlidingComplete={this._onSeekSliderSlidingComplete}
              minimumTrackTintColor='white'            
              maximumTrackTintColor='white'
              thumbTintColor='#1ED760'
            />
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 18, color: 'white'}}>{this.state.isBuffering ? BUFFERING_STRING : ""}</Text>
            <Text style={{fontSize: 18, color: 'white'}}>{this._getTimestamp()}</Text>
          </View>
        </View>
        {/* Music Panel */}
        <View style={{height: '20%', flexDirection: 'row',justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this._shuffle()}>
            <Ionicons name="shuffle"            size={66} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onBackPressed()} >
            <Ionicons name="play-skip-back"     size={66} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPlayPausePressed()} >
            { (this.state.isPlaying)? 
              <Ionicons name="pause" size={66} color="white" />:
              <Ionicons name="play"  size={66} color="white" />
            }
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => this._onStopPressed()} >
            <Ionicons name="stop" size={66} color="white" />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => this._onForwardPressed()} >
            <Ionicons name="play-skip-forward"  size={66} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onLoopPressed()} >
            { (this.state.loopingType)?
              <Ionicons name="infinite" size={66} color="white" />:
              <Ionicons name="infinite" size={66} color="gray" />}
          </TouchableOpacity>
        </View>
      </View>
  
      </SafeAreaView>
    );
  }
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
