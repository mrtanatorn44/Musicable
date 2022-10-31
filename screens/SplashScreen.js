import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";

const image = { uri: "https://cache.umusic.com/_sites/_halo/keshi3/images/gabriel-cover.jpg" };

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={{ alignItems: "center" }}>
          <View style={{ justifyContent: "center", width: "90%", marginTop: 700 }}>
            <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={{ fontSize: 20, color: "#585858" }}>Get Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  startButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 31,
    backgroundColor: "#1ED760",
    height: 50,
  }
});
