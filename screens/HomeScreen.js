import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons'; 
import {firebase} from "../firestore/Connect"

import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

const userPlaylistData = [
  {
    name: 'อกหักทิพย์',
    image: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg'
  },
  {
    name: 'ForReading',
    image: 'https://antiques.com.au/wp-content/uploads/2021/04/old-books-scaled.jpg'
  },
  {
    name: 'Chill beat',
    image: 'https://i.scdn.co/image/ab67706c0000bebbcb7db8bdf70f8e8f57fd6d7f'
  },
  {
    name: 'Take me home',
    image: 'https://photos.hancinema.net/photos/fullsizephoto1280296.jpg'
  },
  {
    name: 'คนเหงา',
    image: 'https://www.cnet.com/a/img/resize/61c44c6765cb6b8529df884935ad7aefc622aeec/hub/2021/11/03/3c2a7d79-770e-4cfa-9847-66b3901fb5d7/c09.jpg?auto=webp&fit=crop&height=675&width=1200'
  },
  {
    name: 'เพลิดเพลิน',
    image: 'https://i.pinimg.com/originals/39/e4/4f/39e44f1e597af59afd6cc3aeddb3737c.jpg'
  },
  {
    name: 'คนมีความรัก',
    image: 'https://i.ytimg.com/vi/6o-ppv72CkI/maxresdefault.jpg'
  },
  {
    name: 'Stupid Song',
    image: 'https://i.scdn.co/image/ab67706c0000bebb6fc7dd59d13ed9787746ea6a'
  },
  {
    name: 'คนเท่',
    image: 'https://572616-1851286-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2022/03/MEME-2-1.jpg'
  },
  {
    name: 'คนหล่อ',
    image: 'https://i1.sndcdn.com/avatars-VzxsY5vKPrJpdjyB-PSNvdw-t500x500.jpg'
  }
]
const userPlaylistRowData = userPlaylistData.reduce(function (rows, key, index) { 
  return (index % 2 == 0 ? rows.push([key]) 
    : rows[rows.length-1].push(key)) && rows;
}, []);

const officialPlaylistData = [
  {
    name: 'TodayTopHits',
    image: 'https://i.scdn.co/image/ab67706f000000031817e5fdb5fab133b0c4b24a',
    title: 'SZA is on top of the Hottest'
  },
  {
    name: 'Daily Lift',
    image: 'https://i.scdn.co/image/ab67706f0000000379b71c14d0de6559395718b1',
    title: 'Get in the zone with these'
  },
  {
    name: '50 อันดับยอดนิยม',
    image: 'https://charts-images.scdn.co/assets/locale_en/regional/daily/region_th_large.jpg',
    title: 'ที่สุดเพลงไทยฮิต ต้องเพลย์ลิสต์นี้!'
  },
  {
    name: 'เพลงไทยสายชิลล์',
    image: 'https://i.scdn.co/image/ab67706f000000037ce4e96df973b779974d524c',
    title: 'ชิลล์กันแบบเต็มๆกับเพลงอะคูสติกเพราะๆ'
  },
  {
    name: 'ฮิตติดกระแส',
    image: 'https://i.scdn.co/image/ab67706f00000002cf5a704113b07736c4e07010',
    title: 'เพลงใหม่มาแรง เพลงฮิตล่าสุด'
  },
  {
    name: 'มิกซ์อินดี้',
    image: 'https://i.scdn.co/image/ab67706f0000000346cdc3dc94a75071935f7215',
    title: 'อินดี้โดนใจ'
  },
  {
    name: 'มิกซ์สุขใจ',
    image: 'https://i.scdn.co/image/ab67616d0000b273092484cae9035e4f48d76cab',
    title: 'สุขใจทุกครั้งที่ได้ฟัง'
  },
  {
    name: 'ฉันฟังเพลงไทย',
    image: 'https://i.scdn.co/image/ab67706f0000000324935074fa8c08fb0e7993f2',
    title: 'ที่สุดเพลงไทยฮิต ต้องเพลย์ลิสต์นี้!'
  },
  {
    name: 'Top Songs 2022',
    image: 'https://i.scdn.co/image/ab67706c0000bebb36f265a516e7f3a73d1a05f4',
    title: 'Todays Top Hits'
  },
  {
    name: 'Workspace 2021',
    image: 'https://i.scdn.co/image/ab67706f000000032973d60df0c69b14865f35d2',
    title: 'time for a good day'
  },
]

const SuggestedArtistsData = [
  {
    name: 'Joji',
    image: 'https://i.scdn.co/image/ab67616d0000b27353f6fa0d2589c6a7174f4b81'
  },
  {
    name: 'Anatomy Rabbit',
    image: 'https://i.scdn.co/image/ab6761610000e5eb001da630489c592d46065c1b'
  },
  {
    name: 'Sam Smith',
    image: 'https://i.scdn.co/image/ab67616d00001e02f3ea7140c4a8ba597d0b276b'
  },
  {
    name: 'Coldplay',
    image: 'https://i.scdn.co/image/ab67706f00000003a231f671c289555cfd09f716'
  },
  {
    name: 'Keshi',
    image: 'https://i.scdn.co/image/ab67616d0000b27394237be74edae41560152bce'
  },
  {
    name: 'The Weeknd',
    image: 'https://res.theconcert.com/c_thumb/987f0076bc673e85820cc4ef97953a683/the-weeknd.jpg'
  },
  {
    name: 'Polycat',
    image: 'https://www.thaiticketmajor.com/variety/img_content/imgeditor/44956648_1996770933721525_4152932259369844736_n.jpg'
  },
  {
    name: 'Billkin',
    image: 'https://i.scdn.co/image/ab6761610000e5ebfb447e233231e16d14c58f57'
  },
  {
    name: 'Jeff Bernat',
    image: 'https://i.scdn.co/image/ab6761610000e5eb542d7186c5db3b26d923a49d'
  },
  {
    name: 'Slchld',
    image: 'https://cdns-images.dzcdn.net/images/artist/2ac1ff5774447e912a4323e3d5622966/500x500.jpg'
  }
]

// https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp
export default function MainScreen() {
  const navigation = useNavigation();
  const page = 'home'
  const [myText, setMyText] = useState('');


  const renderUserPlaylist = ({ item }) => (
    <View>
      <TouchableOpacity 
        style={styles.userPlaylistItem} 
        onPress={() => setMyText(item[0].name)}
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
        onPress={() => setMyText(item[1].name)}
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
        onPress={() => setMyText(item.name)}
      >
        <Image
          style={{width: '90%', height: '60%', borderRadius: 20}}
          source={{ uri: item.image}}
        />
        <View style={{width: '90%', height: '30%'}}>
          <Text style={styles.text} numberOfLines={1} >{item.name}</Text>
          <Text style={[styles.text, {fontSize: 12, color: 'gray'}]} numberOfLines={2}>{item.title}</Text>
        </View>
      </TouchableOpacity> 
    </View>
  );

  const renderSuggestedArtists = ({ item }) => (
    <View>
      <TouchableOpacity 
        style={styles.suggestedArtistsItem} 
        onPress={() => setMyText(item.name)}
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
        {/* User Playlist */}
        <View style={styles.userPlaylist}>
          <Text style={styles.textBold}>{greeting()}</Text>
          <FlatList
            horizontal={true} 
            style={styles.userPlaylistScroll}
            data={userPlaylistRowData}
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
            data={officialPlaylistData}
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
            data={SuggestedArtistsData}
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

function greeting() {
  var hours = new Date().getHours();
  if (hours >= 5 && hours < 12) {
    return 'Good Morning'
  } else if (hours >= 12 && hours < 17) {
    return 'Good Afternoon'
  } else {
    return 'Good Evening'
  }
}
