import React, { useState, useEffect } from "react";
import { StyleSheet,Text, View, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import {firebase} from "../firestore/Connect"

const image = {
  uri: "https://cache.umusic.com/_sites/_halo/keshi3/images/gabriel-cover.jpg",
};

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  registerUser = async (username, email, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://mobile-week09-265cb.firebaseapp.com",
          })
          .then(() => {
            alert("Verification email sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                username,
                email,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  
  return (
    <ImageBackground source={image} resizeMode="cover" style={{ height: "100%" }}>
      <View style={styles.registerContainer}>
        <Text style={styles.textBold}>
          Create Account
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCorrect={false}
          onChangeText={(username) => setUsername(username)}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        ></TextInput>
        <TextInput 
          style={styles.input}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        ></TextInput>
        <TouchableOpacity style={styles.registerButton} onPress={() => registerUser(username, email, password) }>
          <Text style={{ color: "#585858", fontSize: 25, fontWeight: "bold" }}>
            Signup
          </Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 16 }}>
            Already have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen") }>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
    color: '#585858',
    fontSize: 32,
    fontWeight: 'bold'
  },
  text: {
    color: '#585858',
    fontSize: 18,
  },

  registerContainer: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    height: 700,
    width: "100%",
    paddingTop: 20,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position:'absolute',
    bottom: -200
  },
  input: {
    color: "black",
    paddingHorizontal: 10,
    height: "8%",
    width: "90%",
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 31,
    borderColor: "black",
    borderWidth: 1,
  },
  registerButton: {
    backgroundColor: "#1ED760",
    alignItems: "center",
    width: "90%",
    paddingVertical: 10,
    marginVertical: 10,
    height: "8%",
    borderRadius: 31,
  }
})