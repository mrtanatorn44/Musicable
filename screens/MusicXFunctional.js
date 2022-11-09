import React, { useState, useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, } from "react-native";
import { Asset } from "expo-asset";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, ResizeMode, Video, } from "expo-av";
import * as Font from "expo-font";
import Slider from "@react-native-community/slider";

import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 

const PLAYLIST = [
  {
    name    : "Comfort Fit - “Sorry”",
    uri     : "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    isVideo : false
  },
  {
    name    : "Big Buck Bunny",
    uri     : "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    isVideo : true
  },
  {
    name    : "Mildred Bailey – “All Of Me”",
    uri     : "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
    isVideo : false
  },
  {
    name    : "Popeye - I don't scare",
    uri     : "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
    isVideo : true
  },
  {
    name    : "Podington Bear - “Rubber Robot”",
    uri     : "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
    isVideo : false
  }
];

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF8ED";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;

export default function MixScreen ({route}) {
  // const [index, setIndex]                                 = useState(0);
  // const [isSeeking, setIsSeeking]                         = useState(false);
  // const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);
  // const [playbackInstance, setPlaybackInstance]           = useState(null);
  let index                       = 0;
  let isSeeking                       = false;
  let shouldPlayAtEndOfSeek = false;
  let playbackInstance = null;

  const [showVideo, setShowVideo] = useState(false);
  const [playbackInstanceName, setPlaybackInstanceName] = useState(LOADING_STRING);
  const [loopingType, setLoopingType] = useState(LOOPING_TYPE_ALL);
  const [muted, setMuted] = useState(false);
  const [playbackInstancePosition, setPlaybackInstancePosition] = useState(null);
  const [playbackInstanceDuration, setPlaybackInstanceDuration] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldCorrectPitch, setShouldCorrectPitch] = useState(true);
  const [volume, setVolume] = useState(1.0);
  const [rate, setRate] = useState(1.0);
  const [videoWidth, setVideoWidth] = useState(DEVICE_WIDTH);
  const [videoHeight, setVideoHeight] = useState(VIDEO_CONTAINER_HEIGHT);
  const [poster, setPoster] = useState(false);
  const [useNativeControls, setUseNativeControls] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [throughEarpiece, setThroughEarpiece] = useState(false);

  // const [myVideo, setMyVideo] = useState(null)
  // const myVideo = React.useRef(null);
  var myVideo = null

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeIOS.DuckOthers,
      playThroughEarpieceAndroid: false,
    });

    // return () => {
    //   second
    // }
  }, [])
  
  const _loadNewPlaybackInstance = async(playing) => {
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      // playbackInstance.setOnPlaybackStatusUpdate(null);
      playbackInstance = null
    }

    const source = { uri: PLAYLIST[index].uri };
    const initialStatus = {
      shouldPlay: playing,
      rate: rate,
      shouldCorrectPitch: shouldCorrectPitch,
      volume: volume,
      isMuted: muted,
      isLooping: loopingType === LOOPING_TYPE_ONE,
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    if (PLAYLIST[index].isVideo) {
      await myVideo.loadAsync(source, initialStatus);
      // _video.onPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      // setPlaybackInstance(myVideo)
      playbackInstance = myVideo;
      const status = await myVideo.getStatusAsync();
    } else {
      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus,
        _onPlaybackStatusUpdate
      );
      // setPlaybackInstance(sound)
      playbackInstance = sound;
    }

    _updateScreenForLoading(false);
  }

  const _mountVideo = (component) => {
    myVideo = component
    // setMyVideo(component)
    _loadNewPlaybackInstance(false);
  };

  const _updateScreenForLoading = (isLoading) => {
    if (isLoading) {
      setShowVideo(false)
      setIsPlaying(false)
      setPlaybackInstanceName(LOADING_STRING)
      setPlaybackInstanceDuration(null)
      setPlaybackInstancePosition(null)
      setIsLoading(true)
    } else {
      setPlaybackInstanceName(PLAYLIST[index].name)
      setShowVideo(PLAYLIST[index].isVideo)
      setIsLoading(false)
    }
  }

  const _onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) { 
      setPlaybackInstancePosition(status.positionMillis)
      setPlaybackInstanceDuration(status.durationMillis)
      setShouldPlay(status.shouldPlay)
      setIsPlaying(status.isPlaying)
      setIsBuffering(status.isBuffering)
      setRate(status.rate)
      setMuted(status.isMuted)
      setVolume(status.volume)
      setLoopingType(status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL)
      setShouldCorrectPitch(status.shouldCorrectPitch)

      if (status.didJustFinish && !status.isLooping) {
        _advanceIndex(true);
        _updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  const _onLoad = (status) => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  const _onError = (error) => {
    console.log(`ON ERROR : ${error}`);
  };

  const _onReadyForDisplay = (event) => {
    const widestHeight =
      (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      setVideoWidth((VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) / event.naturalSize.height)
      setVideoHeight(VIDEO_CONTAINER_HEIGHT)
    } else {
      setVideoWidth(DEVICE_WIDTH)
      setVideoHeight((DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width)
    }
  };

  const _onFullscreenUpdate = (event) => {
    console.log(`FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`);
  };

  const _advanceIndex = (forward) => {
    index = (index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length;
  }

  const  _updatePlaybackInstanceForIndex = async(playing) => {
    _updateScreenForLoading(true);

    setVideoWidth(DEVICE_WIDTH)
    setVideoHeight(VIDEO_CONTAINER_HEIGHT)

    _loadNewPlaybackInstance(playing);
  }

  const _onPlayPausePressed = () => {
    if (playbackInstance != null) {
      if (isPlaying) {
        playbackInstance.pauseAsync();
      } else {
        playbackInstance.playAsync();
      }
    }
  };

  const _onStopPressed = () => {
    if (playbackInstance != null) {
      playbackInstance.stopAsync();
    }
  };

  const _onForwardPressed = () => {
    if (playbackInstance != null) {
      _advanceIndex(true);
      _updatePlaybackInstanceForIndex(shouldPlay);
    }
  };

  const _onBackPressed = () => {
    if (playbackInstance != null) {
      _advanceIndex(false);
      _updatePlaybackInstanceForIndex(shouldPlay);
    }
  };

  const _onMutePressed = () => {
    if (playbackInstance != null) {
      playbackInstance.setIsMutedAsync(!muted);
    }
  };

  const _onLoopPressed = () => {
    if (playbackInstance != null) {
      playbackInstance.setIsLoopingAsync(
        loopingType !== LOOPING_TYPE_ONE
      );
    }
  };

  const _onVolumeSliderValueChange = (value) => {
    if (playbackInstance != null) {
      playbackInstance.setVolumeAsync(value);
    }
  };

  const _trySetRate = async (rate, shouldCorrectPitch) => {
    if (playbackInstance != null) {
      try {
        await playbackInstance.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  const _onRateSliderSlidingComplete = async (value) => {
    _trySetRate(value * RATE_SCALE, shouldCorrectPitch);
  };

  const _onPitchCorrectionPressed = async (value) => {
    _trySetRate(rate, !shouldCorrectPitch);
  };

  const _onSeekSliderValueChange = (value) => {
    if (playbackInstance != null && !isSeeking) {
      isSeeking = true;
      shouldPlayAtEndOfSeek = shouldPlay;
      playbackInstance.pauseAsync();
    }
  };

  const _onSeekSliderSlidingComplete = async (value) => {
    if (playbackInstance != null) {
      isSeeking = false;
      const seekPosition = value * playbackInstanceDuration;
      if (shouldPlayAtEndOfSeek) {
        playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  const _getSeekSliderPosition = () => {
      if (
        playbackInstance != null &&
        playbackInstancePosition != null &&
        playbackInstanceDuration != null
      ) {
        return (
          playbackInstancePosition /
          playbackInstanceDuration
        );
      }
      return 0;
 
    
  }

  const _getMMSSFromMillis = (millis) => {
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

  const _getTimestamp = () => {
      if (
        playbackInstance != null &&
        playbackInstancePosition != null &&
        playbackInstanceDuration != null
      ) {
        return `${_getMMSSFromMillis(
          playbackInstancePosition
        )} / ${_getMMSSFromMillis(playbackInstanceDuration)}`;
      }
      return "";
  
  }

  const _onPosterPressed = () => {
    setPoster(!poster)
  };

  const _onUseNativeControlsPressed = () => {
    setUseNativeControls(!useNativeControls)
  };

  const ssss_onFullscreenPressed = () => {
    try {
      myVideo.presentFullscreenPlayer();
    } catch (error) {
      console.log(error.toString());
    }
  };

  const _onSpeakerPressed = () => {
    setThroughEarpiece(!throughEarpiece,
      () => {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: InterruptionModeIOS.DuckOthers,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeIOS.DuckOthers,
          playThroughEarpieceAndroid: throughEarpiece,
        })
      })
  };

  return (
    <SafeAreaView style={styles.container}>
    {/* CONTENT */}
    <View style={styles.content}>
      {/* Top Panel */}
      <View style={{marginVertical: '3%', width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => navigation.navigate(route.params.fromPage)}>
          <MaterialIcons style={{textAlign: 'left'}} name="keyboard-arrow-left" size={32} color="white" />
        </TouchableOpacity>
        <Text style={{fontSize: 24, color: 'white'}} numberOfLines={1}>{playbackInstanceName}</Text>
        <Text style={{fontSize: 18, color: 'white'}}></Text>
      </View>
      {/* Music Image */}
      <View style={{height: '50%', backgroundColor: 'red'}}>
        {/* <Image style={{height: '100%', width: '100%'}} source={{ uri: playlistData.songs[trackIndex].image}}/> */}
        <Video
          ref={_mountVideo}
          style={[
            styles.video,
            {
              opacity: showVideo ? 1.0 : 0.0,
              width: videoWidth,
              height: videoHeight,
            },
          ]}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
          onLoadStart={_onLoadStart}
          onLoad={_onLoad}
          onError={_onError}
          onFullscreenUpdate={_onFullscreenUpdate}
          onReadyForDisplay={_onReadyForDisplay}
          useNativeControls={useNativeControls}
        />
      </View>
      {/* Music Info */}
      <View style={{height: '10%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}} numberOfLines={1}>{playbackInstanceName}</Text>
        <Text style={{fontSize: 18, color: 'white'}} numberOfLines={1}>{playbackInstanceName}</Text>
      </View>
      {/* Music Track */}
      <View style={{height: '10%', justifyContent: 'center', flexDirection: 'column'}}>
        <View style={{width: '100%', height: '5%'}}>
          <Slider
            // style={styles.playbackSlider}
            // trackImage={ICON_TRACK_1.module}
            // thumbImage={ICON_THUMB_1.module}
            value={_getSeekSliderPosition()}
            onValueChange={_onSeekSliderValueChange()}
            onSlidingComplete={_onSeekSliderSlidingComplete()}
            
          />
        </View>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{fontSize: 18, color: 'white'}}>{isBuffering ? BUFFERING_STRING : ""}</Text>
          <Text style={{fontSize: 18, color: 'white'}}>{_getTimestamp()}</Text>
        </View>
      </View>
      {/* Music Panel */}
      <View style={{height: '20%', flexDirection: 'row',justifyContent: 'space-between'}}>
        <TouchableOpacity >
          <Ionicons name="shuffle"            size={66} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _onBackPressed()} >
          <Ionicons name="play-skip-back"     size={66} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _onPlayPausePressed()} >
          {/* { (playMusic)? */}
            {/* <Ionicons name="pause" size={66} color="white" />: */}
            <Ionicons name="play"  size={66} color="white" />
            {/* } */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _onStopPressed()} >
          <Ionicons name="stop" size={66} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _onForwardPressed()} >
          <Ionicons name="play-skip-forward"  size={66} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setReapeatMusic(!repeatMusic)} >
          {/* { (repeatMusic)? */}
            <Ionicons name="repeat" size={66} color="white" />
            {/* :
            <Ionicons name="repeat"  size={66} color="gray" />} */}
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
