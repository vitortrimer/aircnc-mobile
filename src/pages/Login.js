import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from "react-native";

import api from "../services/api";

import logo from "../../assets/logo.png";

export default function Login({ navigation }) {
  //STATES
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");

  //LOGGED IN VERIFICATION
  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) navigation.navigate("List");
    });
  }, []);

  //SUBMIT FORM
  async function handleSubmit() {
    const response = await api.post("/sessions", {
      email
    });
    const { _id } = response.data;
    await AsyncStorage.setItem("user", _id);
    await AsyncStorage.setItem("techs", techs);
    navigation.navigate("List");
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
      style={styles.container}
    >
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>YOUR E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>TECHNOLOGIES *</Text>
        <TextInput
          style={styles.input}
          placeholder="Technologies you are interested in"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Find spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
