import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import { Formik } from "formik";
// import * as yup from "yup";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { HStack } from "native-base";

const Mainscreen = () => {
  const [chars, setChars] = useState([]);
  const [usernameAvailable, setAvailable] = useState(false);

  const callSearchApi = async (query) => {
    const response = await fetch(
      `https://imdb8.p.rapidapi.com/auto-complete?q=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-rapidapi-key":
            "30a79d49e4msh60149164f98a8a5p16accdjsn3726a274f766",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
        // body: JSON.stringify(data),
      }
    );
    const responseJson = await response.json();
    console.log(responseJson);
    // setAvailable(responseJson.isAvailable);
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          lineHeight: 32,
          color: "#3E5481",
        }}
      >
        Media Search
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          lineHeight: 25,
          color: "#9FA5C0",
          marginTop: 8,
        }}
      >
        Search for a film, tv show or an actor
      </Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input1}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Search"
          placeholderTextColor="#BDBDBD"
          // value={chars}
          //   value={props.values.username}
          onChangeText={(text) => {
            console.log(text);
            setChars(text);
            callSearchApi(text);
          }}
          //   ref={textinputemail}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "#1701d0",
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  input1: {
    paddingHorizontal: 10,
    color: "black",
    width: 327,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#FFF395",
    backgroundColor: "white",
    borderRadius: 35,
    opacity: 0.6,
    paddingHorizontal: 10,
    width: "90%",
  },
});

export default Mainscreen;
