import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

const podcastsData = [
  {
    name: 'The Ghost Radio',
    image: 'https://i.ytimg.com/vi/lakdbG7ieRs/maxresdefault.jpg'
  },
  {
    name: 'หลอนตามสั่ง',
    image: 'https://s.isanook.com/jo/0/rp/r/w700/ya0xa0m1w0/aHR0cHM6Ly9qb294LWNtcy1pbWFnZS0xMjUxMzE2MTYxLmZpbGUubXlxY2xvdWQuY29tLzIwMjEvMDkvMjcvNjI3NmM3ZjEtMTIyMy00NWYxLTg3ZTktMjk3N2JiODZkNzI1LmpwZy8xMDAw.jpg'
  },
  {
    name: 'คำนี้ดี',
    image: 'https://thestandard.co/wp-content/uploads/2018/08/LOGO-KND-1-600x600.jpg?x60466'
  },
  {
    name: 'วันนี้เป็นยังไงบ้าง',
    image: 'https://images-se-ed.com/ws/Storage/Originals/978616/182/9786161825720L.jpg?h=f1211fc470967b912e9b3c8910feb52e'
  },
  {
    name: 'พูดมาก Podcast',
    image: 'https://storage.buzzsprout.com/variants/ts1frh5vr11v3esupb7amoleqytv/60854458c4d1acdf4e1c2f79c4137142d85d78e379bdafbd69bd34c85f5819ad.jpg'
  },
  {
    name: 'เพื่อนกันคุยจนดึก',
    image: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts112/v4/9b/16/40/9b1640c0-0afa-176b-e610-ee6b097ab141/mza_4794616745179748952.jpg/250x250bb.jpg'
  },
  {
    name: '8 Minute History',
    image: 'https://thestandard.co/wp-content/uploads/2021/02/logo-minutes-history-600x600.jpg?x60466'
  },
  {
    name: 'The Standard',
    image: 'https://pbs.twimg.com/profile_images/1371418327726264320/_9XbcEOG_400x400.jpg'
  },
  {
    name: 'พี่อ้อยพี่ฉอด',
    image: 'https://www.innnews.co.th/wp-content/uploads/2021/08/3F984A73-2023-4A3E-837C-B7064050F5F7.jpeg'
  },
  {
    name: '5 Minutes',
    image: 'https://i.scdn.co/image/d06cb0c89ef77620e8d96d864866284b70f727ab'
  }
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
  }
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
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'DiscoverScreen', type: 'podcast', id: 'playlist_id_podcast'})}
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
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'DiscoverScreen', type: 'genre', key: item[0].name})}
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
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'DiscoverScreen', type: 'genre', key: item[1].name})}
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
        onPress={() => navigation.navigate('PlaylistScreen', {from: 'DiscoverScreen', type: 'genre', key: item[2].name})}
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