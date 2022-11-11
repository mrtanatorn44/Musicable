import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons'; 
import {firebase} from "../firestore/Connect"
// import * as MusicsModel from '../firestore/MusicsModel'
import coreData from '../coreData.json';

import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

export default function MainScreen() {
  const navigation = useNavigation();
  const page = 'home'

  const [playlistData, setPlaylistData]                 = useState(null)
  const [playlistOfficialData, setPlaylistOfficialData] = useState(null)
  const [artistsData, setArtistsData]                   = useState(null)

  useEffect(() => {
    loadArtist()
    loadPlaylist()
    loadPlaylistOfficial()
  }, [])

  const testData = async () => {
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n')

    try {
      myData.playlist.forEach( async (data, index) => {
        // delete music.link
        // music.like = Math.floor(Math.random() * (music.view - music.view/10 + 1) + music.view/10)
        await MusicsModel.addData(data, (isDone) => {
          if (isDone) console.log((index+1) + ' added  : ' + data.name)
          else console.log((index+1) + ' failed : ' + data.name)
        })
      });
    } catch (error) {
      console.error(error)
    }
  }

  const greeting = () => {
    var hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      return 'Good Morning'
    } else if (hours >= 12 && hours < 17) {
      return 'Good Afternoon'
    } else {
      return 'Good Evening'
    }
  }
  const getNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const loadPlaylist = async () => {
    var data = []
    coreData.playlist.forEach((playlist) => {
      if (playlist.official == null) {
        data.push(playlist)
      }
    })
    const rowData = data.reduce(function (rows, key, index) { 
      return (index % 2 == 0 ? rows.push([key]) 
        : rows[rows.length-1].push(key)) && rows;
    }, []);
    setPlaylistData(rowData)
    return
    try {
      await MusicsModel.getPopularPlaylist((res) => {
        const playlistRowData = res.reduce(function (rows, key, index) { 
          return (index % 2 == 0 ? rows.push([key]) 
            : rows[rows.length-1].push(key)) && rows;
        }, []);
        setPlaylistData(playlistRowData)
      })
    } catch (error) {
      console.error(error)
    }
  }
  const loadPlaylistOfficial = async () => {
    var data = []
    coreData.playlist.forEach((playlist) => {
      if (playlist.official == true) {
        data.push(playlist)
      }
    })
    setPlaylistOfficialData(data)
    return
    try {
      await MusicsModel.getPopularPlaylistOfficial((playlistData) => {
        setPlaylistOfficialData(playlistData)
      })
    } catch (error) {
      console.error(error)
    }
  }
  const loadArtist = async () => {
    var data = []
    coreData.artist.forEach((artist) => {
      if (artist.podcast == null) {
        data.push(artist)
      }
    })
    setArtistsData(data)
    return
    try {
      await MusicsModel.getPopularArtist((res) => {
        setArtistsData(res)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const renderUserPlaylist = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.userPlaylistItem}
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'HomeScreen', type: 'playlist', name: item[0].name})}
      >
        <Image
          style={{width: '40%', height: '100%'}}
          source={{ uri: item[0].image}}
        />
        <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text} numberOfLines={1}>{item[0].name}</Text>
        </View>
      </TouchableOpacity> 
      <TouchableOpacity 
        style={styles.userPlaylistItem} 
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'HomeScreen', type: 'playlist', name: item[1].name})}
      >
        <Image
          style={{width: '40%', height: '100%'}}
          source={{ uri: item[1].image}}
        />
        <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text} numberOfLines={1}>{item[1].name}</Text>
        </View>
      </TouchableOpacity> 
    </View>
  );
  const renderOfficialPlaylist = ({ item }) => (
    <View>
      <TouchableOpacity 
        style={styles.officialPlaylistItem} 
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'HomeScreen', type: 'playlist', name: item.name})}
      >
        <Image
          style={{width: '90%', height: '60%', borderRadius: 20}}
          source={{ uri: item.image}}
        />
        <View style={{width: '90%', height: '30%'}}>
          <Text style={styles.text} numberOfLines={1} >{item.name}</Text>
          <Text style={[styles.text, {fontSize: 12, color: 'gray'}]} numberOfLines={2}>{getNumber(item.view)} views</Text>
        </View>
      </TouchableOpacity> 
    </View>
  );
  const renderSuggestedArtists = ({ item }) => (
    <View>
      <TouchableOpacity 
        style={styles.suggestedArtistsItem} 
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'HomeScreen', type: 'artist', name: item.name})}
      >
        <Image
          style={{aspectRatio: 1, height: '60%', borderRadius: 1000}}
          source={{ uri: item.image}}
        />
        <View style={{width: '90%', height: '20%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text} numberOfLines={1} >{item.name}</Text>
        </View>
      </TouchableOpacity> 
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT */}
      <View style={styles.content}>
        
        {/* Add data button */}
        {/* <TouchableOpacity
          style={styles.userPlaylistItem}
          onPress={() => testData()}
        >
          <Text>Add</Text>
        </TouchableOpacity> */}

        {/* User Playlist */}
        <View style={styles.userPlaylist}>
          <Text style={styles.textBold}>{greeting()}</Text>
          <FlatList
            horizontal={true} 
            style={styles.userPlaylistScroll}
            data={playlistData}
            renderItem={renderUserPlaylist}
            // keyExtractor={(playlist) => playlist.id}
          />
        </View>

        {/* Official Playlist */}
        <View style={styles.officialPlaylist}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: '#1ED760'}]}>Playlist</Text>
            <Text style={styles.text}> Official</Text>
          </View>
          <FlatList
            horizontal={true} 
            style={styles.officialPlaylistScroll}
            data={playlistOfficialData}
            renderItem={renderOfficialPlaylist}
            // keyExtractor={(playlist) => playlist.id}
          />
        </View>
        {/* Suggested Artists */}
        <View style={styles.suggestedArtists}>
          <Text style={styles.text}>Suggested Artists</Text>
          <FlatList
            horizontal={true} 
            style={styles.suggestedArtistsScroll}
            data={artistsData}
            renderItem={renderSuggestedArtists}
            // keyExtractor={(playlist) => playlist.id}
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => navigation.navigate('HomeScreen')}>
          <Octicons name="home" size={32} color={page=='home' ? "#1ED760" : "#fff"} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => navigation.navigate('DiscoverScreen')}>
          <Octicons name="search" size={32} color={page=='discover' ? "#1ED760" : "#fff"} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => navigation.navigate('LibraryScreen')}>
          <Octicons name="stack" size={32} color={page=='library' ? "#1ED760" : "#fff"} />
        </TouchableOpacity>
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
  footer: {
    position: 'absolute',
    width: '100%',
    height: '10%',
    bottom: 0,
    backgroundColor: '#0E0E0F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
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

  userPlaylist: {
    marginVertical: '3%'
  },
  userPlaylistScroll: {
    // backgroundColor: 'green',
    height: '20%',
    width: '100%'
  },
  userPlaylistItem: {
    flexDirection: 'row',
    backgroundColor: '#585858',
    width: width/2.5,
    height: '45%',
    margin: 5,
  },

  officialPlaylist: {
    marginVertical: '3%'
  },
  officialPlaylistScroll: {
    // backgroundColor: 'green',
    height: '30%',
    width: '100%'
  },
  officialPlaylistItem: {
    flexDirection: 'column',
    backgroundColor: '#0E0E0F',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
    width: width/3,
    height: '100%',
    margin: 5,
  },
  
  suggestedArtists: {
    marginVertical: '3%',
  },
  suggestedArtistsScroll: {
    // backgroundColor: 'green',
    height: '25%',
    width: '100%'
  },
  suggestedArtistsItem: {
    flexDirection: 'column',
    backgroundColor: '#0E0E0F',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
    width: width/3,
    height: '100%',
    margin: 5,
  },


});


