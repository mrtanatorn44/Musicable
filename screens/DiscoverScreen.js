import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

const podcastsData = [
  {
    name: 'Podcast1',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast2',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast3',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast4',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast5',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast6',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast7',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast8',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast1',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast2',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast3',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast4',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast5',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast6',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast7',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
  {
    name: 'Podcast8',
    image: 'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg?w=2000'
  },
]

const browseData = [
  {
    name: 'Charts'
  },
  {
    name: 'Artist'
  },
  {
    name: 'Language'
  },
  {
    name: 'Genre'
  },
  {
    name: 'Podcast'
  },
  {
    name: 'Followed'
  },
  {
    name: 'Charts'
  },
  {
    name: 'Artist'
  },
  {
    name: 'Language'
  },
  {
    name: 'Genre'
  },
  {
    name: 'Podcast'
  },
  {
    name: 'Followed'
  },
]
const browseRowData = browseData.reduce(function (rows, key, index) { 
  return (index % 3 == 0 ? rows.push([key]) 
    : rows[rows.length-1].push(key)) && rows;
}, []);

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const page = 'discover'
  const [myText, setMyText] = useState('');

  const renderPodcasts = ({ item }) => (
    <View>
      <TouchableOpacity 
        style={styles.podcastsItem} 
        onPress={() => setMyText(item.name)}
      >
        <Image
          style={{width: '90%', height: '60%', borderRadius: 20}}
          source={{ uri: item.image}}
        />
        <View style={{width: '90%', height: '30%'}}>
          <Text style={styles.text} numberOfLines={1} >{item.name}</Text>
          <Text style={[styles.text, {fontSize: 18, color: 'gray'}]} numberOfLines={1}>333 ep</Text>
        </View>
      </TouchableOpacity> 
    </View>
  );

  const renderBrowse = ({ item }) => (
    <View>
      <TouchableOpacity 
        style={styles.browseItem} 
        onPress={() => setMyText(item[0].name)}
      >
        <LinearGradient 
          colors={[randomColor(), randomColor()]} 
          start={[0, 1]} end={[1, 0]}
          style={{width: '100%', padding: 20, borderRadius: 10}}
        >
          <Text style={styles.text}>{item[0].name}</Text>
        </LinearGradient>
      </TouchableOpacity> 
      <TouchableOpacity 
        style={styles.browseItem} 
        onPress={() => setMyText(item[1].name)}
      >
        <LinearGradient 
          colors={[randomColor(), randomColor()]} 
          start={[0, 1]} end={[1, 0]}
          style={{width: '100%', padding: 20, borderRadius: 10}}
        >          
          <Text style={styles.text}>{item[1].name}</Text>
        </LinearGradient>
      </TouchableOpacity> 
      <TouchableOpacity 
        style={styles.browseItem} 
        onPress={() => setMyText(item[2].name)}
      >
        <LinearGradient 
          colors={[randomColor(), randomColor()]} 
          start={[0, 1]} end={[1, 0]}
          style={{width: '100%', padding: 20, borderRadius: 10}}
        >          
          <Text style={styles.text}>{item[2].name}</Text>
        </LinearGradient>
      </TouchableOpacity> 
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT */}
      <View style={styles.content}>
        {/* User Playlist */}
        <View style={{marginVertical: '3%'}}>
          <Text style={styles.textBold}>Discover</Text>
        </View>

        {/* Official Playlist */}
        <View style={styles.podcasts}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Podcast's</Text>
          </View>
          <FlatList
            horizontal={true} 
            style={styles.podcastsScroll}
            data={podcastsData}
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
            data={browseRowData}
            renderItem={renderBrowse}
            // keyExtractor={(playlist) => playlist.id}
          />
        </View>

      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
          <Octicons name="home" size={32} color={page=='home' ? "#1ED760" : "#fff"} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
          <Octicons name="search" size={32} color={page=='discover' ? "#1ED760" : "#fff"} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
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
    fontSize: 32,
    fontWeight: 'bold'
  },
  text: {
    color: 'white',
    fontSize: 24,
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
    width: 200,
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
    width: 250,
    height: '30%',
    margin: 5,
    borderRadius: 10,
  },

});

function randomColor() {
  // return '#' + Math.floor(Math.random()*16777215).toString(16);
  return '#' + Math.floor(Math.random()*16).toString(16) + Math.floor(Math.random()*16).toString(16) + Math.floor(Math.random()*16).toString(16)
}