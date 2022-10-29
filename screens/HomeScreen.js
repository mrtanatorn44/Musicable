import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons'; 

const userPlaylistData = [
  {
    name: 'Playlist1',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist2',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist3',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist4',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist5',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist6',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist7',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist8',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist1',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist2',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist3',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist4',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist5',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist6',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist7',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
  {
    name: 'Playlist8',
    image: 'https://www.cnet.com/a/img/resize/44594962280511db743fe2af25b51c9dc89c7915/hub/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=1200&width=1200'
  },
]
const userPlaylistRowData = userPlaylistData.reduce(function (rows, key, index) { 
  return (index % 2 == 0 ? rows.push([key]) 
    : rows[rows.length-1].push(key)) && rows;
}, []);

const officialPlaylistData = [
  {
    name: 'Playlist1',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist2',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist3',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist4',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist5',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist6',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist7',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist8',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist1',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist2',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist3',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist4',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist5',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist6',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist7',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
  {
    name: 'Playlist8',
    image: 'https://ik.imagekit.io/gdgtme/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg'
  },
]

const SuggestedArtistsData = [
  {
    name: 'Artist1',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist2',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist3',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist4',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist5',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist6',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist7',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist8',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist1',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist2',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist3',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist4',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist5',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist6',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist7',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
  {
    name: 'Artist8',
    image: 'https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp'
  },
]

// https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp
export default function MainScreen() {
  const navigation = useNavigation();
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
          <Text style={styles.text}>{item[0].name}</Text>
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
          <Text style={styles.text}>{item[1].name}</Text>
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
          <Text style={[styles.text, {fontSize: 18, color: 'gray'}]} numberOfLines={2}>Artist, Artist, Artist, Artist, Artist, Artist, Artist</Text>
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
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
          <Octicons name="home" size={32} color="#1ED760" />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
          <Octicons name="search" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
          <Octicons name="stack" size={32} color="#fff" />
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
    width: 250,
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
    width: 200,
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
    width: 200,
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
