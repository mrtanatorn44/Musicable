import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Octicons, MaterialIcons } from '@expo/vector-icons'; 
import { firebase } from "../firestore/Connect";
// import * as MusicsModel from '../firestore/MusicsModel'
import coreData from '../coreData.json';

import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

const musicFromFirebase = [
  {
    name: 'Song1',
    artist: 'Artist',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/32/Dua_Lipa_Swan_Song.png',
    liked: true,
  },
  {
    name: 'Song2',
    artist: 'Artist',
    image: 'https://media.istockphoto.com/vectors/music-background-vector-id1076840920?k=20&m=1076840920&s=612x612&w=0&h=7npgZI1DyLkiejEZM19R0XHWdgJGijuTK4cXZvIA72Q=',
    liked: false,
  },
  {
    name: 'Song3',
    artist: 'Artist',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/32/Dua_Lipa_Swan_Song.png',
    liked: true,
  },
  {
    name: 'Song4',
    artist: 'Artist',
    image: 'https://media.istockphoto.com/vectors/music-background-vector-id1076840920?k=20&m=1076840920&s=612x612&w=0&h=7npgZI1DyLkiejEZM19R0XHWdgJGijuTK4cXZvIA72Q=',
    liked: false,
  },
  {
    name: 'Song5',
    artist: 'Artist',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/32/Dua_Lipa_Swan_Song.png',
    liked: true,
  },
  {
    name: 'Song6',
    artist: 'Artist',
    image: 'https://media.istockphoto.com/vectors/music-background-vector-id1076840920?k=20&m=1076840920&s=612x612&w=0&h=7npgZI1DyLkiejEZM19R0XHWdgJGijuTK4cXZvIA72Q=',
    liked: false,
  },
  {
    name: 'Song7',
    artist: 'Artist',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/32/Dua_Lipa_Swan_Song.png',
    liked: true,
  },
  {
    name: 'Song8',
    artist: 'Artist',
    image: 'https://media.istockphoto.com/vectors/music-background-vector-id1076840920?k=20&m=1076840920&s=612x612&w=0&h=7npgZI1DyLkiejEZM19R0XHWdgJGijuTK4cXZvIA72Q=',
    liked: false,
  },
]

export default function PlaylistScreen ({route}) {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true)
  const [playlist, setPlaylist] = useState({
    title : 'loading...',
    liked : 0,
    label : 'loading...',
    image : null,
    music : []
  })

  useEffect(() => {
    if (isLoading) {
      loadMusic()
    }
  }, [])

  const loadMusic = async () => {
    if (route.params.type == 'genre') {

      var musicArr = []
      coreData.music.forEach(ms => {
        if (ms.genre == route.params.key) {
          musicArr.push(ms)
        }
      })

      setPlaylist(playlist => ({
        ...playlist, 
        ...{
          title : route.params.key,
          liked : musicArr.length,
          image : 'https://miro.medium.com/max/1400/1*FyAXv_iWwamsNRfSjhMzUQ.jpeg',
          label : 'Featuring',
          music : musicArr
        }
      }))
      return
      // type, key
      // firebase.getPlaylistFromGenre(route.params.type)

      // After get data from firebase set in state
      setPlaylist(playlist => ({
        ...playlist, 
        ...{
          title : route.params.type + ' ' + route.params.key,
          liked : 5233492,
          image : 'https://miro.medium.com/max/1400/1*FyAXv_iWwamsNRfSjhMzUQ.jpeg',
          label : 'Featuring',
          music : musicFromFirebase
        }
      }))
    } else if (route.params.type == 'userliked') { 

      var data = []
      coreData.playlist.forEach((pl) => {
        if (pl.name == route.params.name) {

          setPlaylist(playlist => ({
            ...playlist, 
            ...{
              title : pl.name,
              liked : pl.view,
              image : pl.image,
              label : 'Featuring',
            }
          }))

          // get music
          var musicArr = []
          pl.music.forEach((musicName) => {
            // console.log(musicName)
            var result = coreData.music.filter(obj => {return obj.name === musicName})
            console.log(result[0])
            musicArr.push(result[0])
          })
          
          setPlaylist(playlist => ({
            ...playlist, 
            ...{
              music : musicArr 
            }
          }))
          
          return
        }
      })

      return
      // type, id
      // firebase.getPlaylistFromUserLiked(route.params.id)

      // After get data from firebase set in state
      setPlaylist(playlist => ({
        ...playlist, 
        ...{
          title : route.params.type + ' ' + route.params.id,
          liked : 5233492,
          image : 'https://miro.medium.com/max/1400/1*FyAXv_iWwamsNRfSjhMzUQ.jpeg',
          label : 'Featuring',
          music : musicFromFirebase
        }
      }))
    } else if (route.params.type == 'artist') { 

      const randomBet = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      var start = randomBet(0, 200);
      var around = randomBet(6,19);
      // console.log(start, around)

      coreData.artist.forEach((artist) => {
        if (artist.name == route.params.name) {
          setPlaylist(playlist => ({
            ...playlist, 
            ...{
              title : artist.name,
              liked : artist.follower,
              image : artist.image,
              label : 'Popular Release',
            }
          }))

          // get music
          var musicArr = []
          coreData.music.forEach((ms, index) => {
            // console.log(index)
            if (index > start && index < start+around) {
              musicArr.push(ms)
            }
          })
          
          setPlaylist(playlist => ({
            ...playlist, 
            ...{
              music : musicArr 
            }
          }))
          
          return
        }
      })
      // setPlaylistOfficialData(data)
      return
      // get Artist data
      await MusicsModel.getArtist(route.params.id, (artistData) => {
        setPlaylist(playlist => ({
          ...playlist, 
          ...{
            title : artistData.name,
            liked : artistData.follower,
            image : artistData.image,
            label : 'Popular Release',
          }
        }))
        // get Music data
        MusicsModel.getMusicFromArtist(route.params.id, (musicData) => {
          musicData.forEach(element => {
            element.artist = artistData.name
          });
          setPlaylist(playlist => ({
            ...playlist, 
            ...{
              music : musicData 
            }
          }))
        })
      })
        
    } else if (route.params.type == 'podcast') { 
      var musicArr = []
      coreData.music.forEach(ms => {
        if (ms.creator == route.params.name) {
          musicArr.push(ms)
        }
      })
      var artData = {}
      coreData.artist.forEach(art => {
        if (art.name == route.params.name) {
          artData.name = art.name
          artData.follower = art.follower
          artData.image = art.image
          return
        }
      })

      setPlaylist(playlist => ({
        ...playlist, 
        ...{
          title : artData.name,
          liked : artData.follower,
          image : artData.image,
          label : 'Episode',
          music : musicArr
        }
      }))

      
      return
      // get Podcast data
      await MusicsModel.getPodcast(route.params.id, (podcastData) => {
        setPlaylist(playlist => ({
          ...playlist, 
          ...{
            title : podcastData.name,
            liked : podcastData.follower,
            image : podcastData.image,
            label : 'Episode',
          }
        }))
        // get Podcast data
        MusicsModel.getPodcastFromArtist(route.params.id, (podcastData2) => {
          podcastData2.forEach(element => {
            element.artist = podcastData.name
          });
          setPlaylist(playlist => ({
            ...playlist, 
            ...{
              music : podcastData2 
            }
          }))
        })
      })
    } else if (route.params.type == 'playlist') { 
      console.log(route.params.name)

      var data = []
      coreData.playlist.forEach((pl) => {

        if (pl.name == route.params.name) {
          console.log(pl.name)
          setPlaylist(playlist => ({
            ...playlist, 
            ...{
              title : pl.name,
              liked : pl.view,
              image : pl.image,
              label : 'Featuring',
            }
          }))

          // get music
          var musicArr = []
          pl.music.forEach((musicName) => {
            // console.log(musicName)
            var result = coreData.music.filter(obj => {return obj.name === musicName})
            // console.log(result[0])
            musicArr.push(result[0])
          })
          
          setPlaylist(playlist => ({
            ...playlist, 
            ...{
              music : musicArr 
            }
          }))
          
          return
        }
      })
          

      return
      // type, playlist_id
      // firebase.getPlaylistFromID(route.params.id)
      console.log(route.params.id)

      // After get data from firebase set in state
      setPlaylist(playlist => ({
        ...playlist, 
        ...{
          title : route.params.id,
          liked : 5233492,
          label : 'Featuring',
          image : 'https://miro.medium.com/max/1400/1*FyAXv_iWwamsNRfSjhMzUQ.jpeg',
          music : musicFromFirebase
        }
      }))
    }
    setIsLoading(false)
  }

  const getNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const onClickMusic = (music_idx) => {
    navigation.navigate('MusicScreen', 
      {
        from      : 'PlaylistScreen', 
        from_name   : route.name,
        from_type : route.params.type,
        music     : playlist.music,
        music_idx : music_idx,
      }
    )
  }

  const renderMusic = ({ item, index}) => (
    <View style={styles.musicItem}>
      <TouchableOpacity style={{width: '90%', height: '100%', flexDirection: 'row'}} 
        onPress={() => onClickMusic(index)}>
        <Image
          style={{height: '100%', aspectRatio: 1, borderRadius: 20}}
          source={{ uri: item.image}}
        />
        <View style={{width: '70%', height: '100%', justifyContent: 'center', marginHorizontal: '3%'}}>
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}} numberOfLines={1} >{item.name}</Text>
          <Text style={{fontSize: 16, color: 'white'}} numberOfLines={1} >{getNumber(item.like)} liked</Text>
        </View>
      </TouchableOpacity> 
      {/* <TouchableOpacity style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
        {(item.liked)?
        <Octicons name="heart-fill" size={32} color="#1ED760" />:
        <Octicons name="heart" size={32} color="lightgray" />}
      </TouchableOpacity> */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT */}
      <View style={styles.content}>
        {/* Playlist Cover */}
        <View style={styles.playlistImageContainer}>
          {/* Image */}
          { playlist.image && 
          <Image source={{uri: playlist.image}} style={styles.playlistImage}/>}
          {/* Back */}
          <View style={{marginVertical: '10%', paddingHorizontal: '3%'}}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(route.params.from? route.params.from : 'HomeScreen')}>
              <MaterialIcons style={{textAlign: 'center'}} name="keyboard-arrow-left" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{fontSize: 50, position: 'absolute', bottom: 0, margin: '2%'}}>
            {/* Name */}
            <Text style={{fontSize: 50, fontWeight: 'bold',color: 'white'}} numberOfLines={1}>{playlist.title}</Text>
            {/* Liked */}
            { route.params.type != 'genre' &&
            <Text style={{fontSize: 18, color: 'lightgray'}}><Octicons name="heart-fill" size={18} color="lightgray" />
              { ' ' + getNumber(playlist.liked)} {route.params.type == 'artist' ? 'Followers' : 'likes'}
            </Text>}
          </View>
        </View>

        {/* Music list */}
        <View style={{height: '5%', justifyContent: 'center'}}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', letterSpacing: 1}} numberOfLines={1}>{"  " + playlist.label}</Text>
        </View>

        <View style={styles.music}>
          <FlatList
            style={styles.musicScroll}
            data={playlist.music}
            renderItem={renderMusic}
            // keyExtractor={(playlist) => playlist.id}
          />
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
    // paddingHorizontal: '5%',
    // paddingVertical: '10%'
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
  
  backButton: {
    width: '15%', 
    backgroundColor: 'black', 
    padding: 10, 
    borderRadius: 100,
    width: width/10, 
    height: width/10, 
    justifyContent: 'center', 
    opacity: 0.75
  },

  playlistImageContainer: {
    // backgroundColor: 'red',
    height: '45%'
  },
  playlistImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  music: {
    height: '50%',
    // backgroundColor: 'red'
  },
  musicScroll: {
    // backgroundColor: 'blue',
    flexDirection: 'column'
  },
  musicItem: {
    width: '100%',
    height: height/10,
    // backgroundColor: 'green',
    padding: width/75,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
    flexDirection: 'row'
  }
});

