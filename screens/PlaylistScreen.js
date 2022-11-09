import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Octicons, MaterialIcons } from '@expo/vector-icons'; 
import { firebase } from "../firestore/Connect";

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
      loadPlaylistData()
    }
  }, [])

  const loadPlaylistData = () => {
    if (route.params.type == 'genre') {
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
      // type, artist_id
      // firebase.getPlaylistFromUserLiked(route.params.id)

      // After get data from firebase set in state
      setPlaylist(playlist => ({
        ...playlist, 
        ...{
          title : route.params.type + ' ' + route.params.id,
          liked : 5233492,
          image : 'https://miro.medium.com/max/1400/1*FyAXv_iWwamsNRfSjhMzUQ.jpeg',
          label : 'Popular Release',
          music : musicFromFirebase
        }
      }))
    } else if (route.params.type == 'podcast') { 
      // type, artist_id
      // firebase.getPlaylistFromUserLiked(route.params.id)

      // After get data from firebase set in state
      setPlaylist(playlist => ({
        ...playlist, 
        ...{
          title : route.params.type + ' ' + route.params.id,
          liked : 5233492,
          image : 'https://miro.medium.com/max/1400/1*FyAXv_iWwamsNRfSjhMzUQ.jpeg',
          label : 'Sorted Episode',
          music : musicFromFirebase
        }
      }))
    } else if (route.params.type == 'playlist') { 
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

  const onMusicScreen = (music_id) => {
    navigation.navigate('MusicScreen', 
      {
        from: 'PlaylistScreen', 
        from_id: route.params.id,
        from_type: route.params.type,
        id: 'MKk32Ljkjkm3' // music_id
      }
    )
  }

  const renderMusic = ({ item }) => (
    <View style={styles.musicItem}>
      <TouchableOpacity style={{width: '90%', height: '100%', flexDirection: 'row'}} 
        onPress={() => onMusicScreen(item.id)}>
        <Image
          style={{height: '100%', aspectRatio: 1, borderRadius: 20}}
          source={{ uri: item.image}}
        />
        <View style={{width: '70%', height: '100%', justifyContent: 'center', marginHorizontal: '3%'}}>
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}} numberOfLines={1} >{item.name}</Text>
          <Text style={{fontSize: 16, color: 'white'}} numberOfLines={1} >{item.artist}</Text>
        </View>
      </TouchableOpacity> 
      <TouchableOpacity style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
        {(item.liked)?
        <Octicons name="heart-fill" size={32} color="#1ED760" />:
        <Octicons name="heart" size={32} color="lightgray" />}
      </TouchableOpacity>
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
            <Text style={{fontSize: 18, color: 'lightgray'}}><Octicons name="heart-fill" size={18} color="lightgray" /> {getNumber(playlist.liked)} likes</Text>
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

function getNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}