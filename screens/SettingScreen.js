import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Octicons, MaterialIcons } from '@expo/vector-icons'; 
import { firebase } from "../firestore/Connect";

// https://i.insider.com/5b3f8cff447aad22008b4c2f?width=750&format=jpeg&auto=webp
export default function MainScreen({route}) {
  const navigation = useNavigation();
  // const subscribe = useState(true)
  // onSubscribe = async (subscribe) =>{
  //   await firebase.firestore.collection("users").doc().add({subscribe}).catch((error) =>{
  //     alert("error")
  //   })
  // }
  const [username, setUsername] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUsername(snapshot.data());
        } else {
          console.log("Username does not exists");
        }
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT */}
      <View style={styles.content}>
        {/* Page */}
        <View style={{marginVertical: '3%'}}>
          <TouchableOpacity style={{width: '15%'}} 
            onPress={() => navigation.navigate(route.params.fromPage)}
          >
            <MaterialIcons style={{textAlign: 'left'}} name="keyboard-arrow-left" size={32} color="white" />
          </TouchableOpacity>
        </View>

        {/* Options */}
        <View style={{marginVertical: '5%'}}>
          <View style={{flexDirection: 'row', paddingBottom: 10}}>
            <Text style={styles.text}>Account {username.username}</Text>
          </View>
          {/* <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 10}} onPress={() => onSubscribe(subscribe)}>
            <MaterialIcons style={{width: '15%', textAlign: 'center'}} name="attach-money" size={32} color="white" />
            <Text style={[styles.text, {width: '70%'}]}>Subscription</Text>
            <MaterialIcons style={{width: '15%', textAlign: 'center'}} name="keyboard-arrow-right" size={32} color="white" />
          </TouchableOpacity> */}
          <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 10}}>
            <Octicons style={{width: '15%', textAlign: 'center'}} name="download" size={32} color="white" />
            <Text style={[styles.text, {width: '70%'}]}>Downloaded</Text>
            <MaterialIcons style={{width: '15%', textAlign: 'center'}} name="keyboard-arrow-right" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 10}}
            onPress={() => { firebase.auth().signOut(); }}
          >
            <MaterialIcons style={{width: '15%', textAlign: 'center'}} name="logout" size={32} color="white" />
            <Text style={[styles.text, {width: '70%'}]}>Logout</Text>
            <MaterialIcons style={{width: '15%', textAlign: 'center'}} name="keyboard-arrow-right" size={32} color="white" />
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
