import React, { useState, useEffect } from "react";
import { StyleSheet,Text, View, TextInput, ImageBackground, TouchableOpacity } from "react-native";
import { firebase } from "../firestore/Connect";

const image = { uri: "https://cache.umusic.com/_sites/_halo/keshi3/images/gabriel-cover.jpg" };

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert("Pass");
    } catch (error) {
      alert("Please try again");
    }
  };

  //forgot password
  const changePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        alert("Please Insert Your Email");
      });
  };

  // DEMO ACCOUNT user: "test1234", email: "test@test.com", pass: "test1234"
  return (
    <ImageBackground source={image} resizeMode="cover" style={{ height: "100%" }}>

      {/* Fast login */}
      <TouchableOpacity style={{position: 'absolute', justifyContent: 'center', zIndex: 1,backgroundColor: 'red', width: 100, height: 100, top: '80%', end: 0, borderRadius: 100}} 
        onPress={() => loginUser('test@test.com', 'test1234')}>
        <Text style={{textAlign: 'center', color: 'white'}}>Fast Login</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.textBold}>
          Welcome Back
        </Text>
        <Text style={styles.text}>
          Login to your account
        </Text>
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
        <View style={{ alignItems: "flex-end", width: "80%", marginVertical: 10 }}>
          <TouchableOpacity onPress={() => changePassword() }>
            <Text style={styles.text}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => loginUser(email, password) }>
          <Text style={{ color: "#585858", fontSize: 25, fontWeight: "bold" }} >
            Login
          </Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 16 }}>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen") }>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Signup</Text>
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

  loginContainer: {
    alignItems: "center", width: "100%",
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
  loginButton: {
    backgroundColor: "#1ED760",
    alignItems: "center",
    width: "90%",
    paddingVertical: 10,
    marginVertical: 10,
    height: "8%",
    borderRadius: 31,
  }
});
