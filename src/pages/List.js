import React, { useState, useEffect } from "react";
import Socketio from "socket.io-client";
import {
  SafeAreaView,
  Text,
  Alert,
  Image,
  ScrollView,
  AsyncStorage,
  StyleSheet
} from "react-native";

import SpotList from "../components/SpotList";
import logo from "../../assets/logo.png";

export default function Lists() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = Socketio("http://localhost:3333", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Your request in ${booking.spot.company} at ${booking.date} was ${
            booking.approved ? "Approved" : "Declined"
          }`
        );
      });
    });
  });

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storageTechs => {
      const techsArray = storageTechs.split(",").map(item => item.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.logo} source={logo} />
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
