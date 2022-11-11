import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
// import * as MusicsModel from "../firestore/MusicsModel";
import coreData from '../coreData.json';

import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const page = 'discover'
  const [podcastData, setPodcastData] = useState(null);
  const [genreData,setGenreData] = useState(null);
  
  useEffect(() => {
    loadPodcast();
    loadGenre();
  }, []);

  const loadPodcast = async () => {
    var artistData = []
    coreData.artist.forEach(art => {

      if (art.podcast == true) {
        artistData.push(art)
        // console.log(art.name)
      }
    })

    artistData.forEach(art => {
      var count = 0
      coreData.music.forEach(ms => {
        if (ms.creator == art.name) {
          count += 1
        }
      })
      art.ep = count
    })

    setPodcastData(artistData)

    return
    try {
      await MusicsModel.getPopularPodcast((res) => {
        setPodcastData(res);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadGenre = async () => {

    var genreArr = []
    coreData.music.forEach(ms => {
      if (!genreArr.includes(ms.genre)) {
        genreArr.push(ms.genre)
      }
    })
    const RowData = genreArr.reduce(function (rows, key, index) {
      return (
        (index % 3 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
        rows
      );
    }, []);
    setGenreData(RowData)
    return
    try {
      await MusicsModel.getPopularGenre((res) => {
        const browseRowData = res.reduce(function (rows, key, index) {
          return (
            (index % 3 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
            rows
          );
        }, []);
        setGenreData(browseRowData);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderPodcasts = ({ item }) => (
    <View>
      <TouchableOpacity 
        style={styles.podcastsItem} 
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'DiscoverScreen', type: 'podcast', name: item.name})}
      >
        <Image
          style={{width: '90%', height: '60%', borderRadius: 20}}
          source={{ uri: item.image}}
        />
        <View style={{width: '90%', height: '30%'}}>
          <Text style={styles.text} numberOfLines={1} >{item.name}</Text>
          <Text style={[styles.text, {fontSize: 18, color: 'gray'}]} numberOfLines={1}>{item.ep} ep</Text>
        </View>
      </TouchableOpacity> 
    </View>
  );

  const renderBrowse = ({ item }) => (
    <View>
       { item[0] &&
      <TouchableOpacity 
        style={styles.browseItem} 
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'DiscoverScreen', type: 'genre', key: item[0]})}
      >
        <LinearGradient 
          colors={[randomColor(), randomColor()]} 
          start={[0, 1]} end={[1, 0]}
          style={{width: '100%', padding: 20, borderRadius: 10}}
        >
          <Text style={styles.text}>{item[0]}</Text>
        </LinearGradient>
      </TouchableOpacity> }
      { item[1] &&
      <TouchableOpacity 
        style={styles.browseItem} 
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'DiscoverScreen', type: 'genre', key: item[1]})}
      >
        <LinearGradient 
          colors={[randomColor(), randomColor()]} 
          start={[0, 1]} end={[1, 0]}
          style={{width: '100%', padding: 20, borderRadius: 10}}
        >          
          <Text style={styles.text}>{item[1]}</Text>
        </LinearGradient>
      </TouchableOpacity> }
      { item[2] &&
      <TouchableOpacity 
        style={styles.browseItem} 
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'DiscoverScreen', type: 'genre', key: item[2]})}
      >
        <LinearGradient 
          colors={[randomColor(), randomColor()]} 
          start={[0, 1]} end={[1, 0]}
          style={{width: '100%', padding: 20, borderRadius: 10}}
        >          
          <Text style={styles.text}>{item[2]}</Text>
        </LinearGradient>
      </TouchableOpacity> }
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT */}
      <View style={styles.content}>
        {/* Page */}
        <View style={{marginVertical: '3%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.textBold}>Discover</Text>
          <TouchableOpacity style={{width: '15%', justifyContent: 'center'}} 
            onPress={() => navigation.navigate('SettingScreen', {fromPage: 'DiscoverScreen'})}>
            <Octicons style={{textAlign: 'center'}} name="gear" size={32} color="white" />
          </TouchableOpacity>
        </View>

        {/* Podcast */}
        <View style={styles.podcasts}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Podcast's</Text>
          </View>
          <FlatList
            horizontal={true} 
            style={styles.podcastsScroll}
            data={podcastData}
            renderItem={renderPodcasts}
            // keyExtractor={(playlist) => playlist.id}
          />
        </View>

        {/* Browse */}
        <View style={styles.browse}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Browse all</Text>
          </View>
          <FlatList
            horizontal={true} 
            style={styles.browseScroll}
            data={genreData}
            renderItem={renderBrowse}
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

  podcasts: {
    marginVertical: '3%'
  },
  podcastsScroll: {
    // backgroundColor: 'green',
    height: '30%',
    width: '100%'
  },
  podcastsItem: {
    flexDirection: 'column',
    backgroundColor: '#0E0E0F',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
    width: width/3,
    height: '100%',
    margin: 5,
  },

  browse: {
    marginVertical: '3%'
  },
  browseScroll: {
    // backgroundColor: 'green',
    height: '40%',
    width: '100%'
  },
  browseItem: {
    flexDirection: 'row',
    backgroundColor: '#585858',
    width: width/2.5,
    height: '30%',
    margin: 5,
    borderRadius: 10,
  },

});

function randomColor() {
  // return '#' + Math.floor(Math.random()*16777215).toString(16);
  return '#' + Math.floor(Math.random()*16).toString(16) + Math.floor(Math.random()*16).toString(16) + Math.floor(Math.random()*16).toString(16)
}