import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Octicons, MaterialIcons } from '@expo/vector-icons'; 
import { firebase } from "../firestore/Connect";

import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

export default function PlaylistScreen ({route}) {
  const navigation = useNavigation();
  const playlistInfo = "Featuring" // get this from route params
  const [myText, setMyText] = useState('');

  const playlistData = {
    name: 'Playlist TOP 2022',
    liked: 24054,
    image: 'https://miro.medium.com/max/1400/1*FyAXv_iWwamsNRfSjhMzUQ.jpeg',
    songs: [
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
  }

  const renderSongs = ({ item }) => (
    <View style={styles.songsItem}>
      <TouchableOpacity style={{width: '90%', height: '100%', flexDirection: 'row'}} onPress={() => setMyText(item.name)}>
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
        {/* Playlist Image */}
        <View style={styles.playlistImageContainer}>
          <Image source={{uri: playlistData.image}} style={styles.playlistImage}/>
          <View style={{marginVertical: '10%', paddingHorizontal: '3%'}}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(route.params.fromPage)}>
              <MaterialIcons style={{textAlign: 'center'}} name="keyboard-arrow-left" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{fontSize: 50, position: 'absolute', bottom: 0, margin: '2%'}}>
            <Text style={{fontSize: 50, fontWeight: 'bold',color: 'white'}} numberOfLines={1}>{playlistData.name}</Text>
            <Text style={{fontSize: 18, color: 'lightgray'}}><Octicons name="heart-fill" size={18} color="lightgray" /> {getNumber(playlistData.liked)} likes</Text>
          </View>
        </View>

        {/* Song list */}
        <View style={{height: '5%', justifyContent: 'center'}}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', letterSpacing: 1}} numberOfLines={1}>{"  " + playlistInfo}</Text>
        </View>

        <View style={styles.songs}>
          <FlatList
            style={styles.songsScroll}
            data={playlistData.songs}
            renderItem={renderSongs}
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

  songs: {
    height: '50%',
    // backgroundColor: 'red'
  },
  songsScroll: {
    // backgroundColor: 'blue',
    flexDirection: 'column'
  },
  songsItem: {
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