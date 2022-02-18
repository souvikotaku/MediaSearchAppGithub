import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
// import { Formik } from "formik";
// import * as yup from "yup";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { HStack } from "native-base";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Mainscreen = () => {
  const [chars, setChars] = useState([]);
  const [usernameAvailable, setAvailable] = useState(false);
  const [query, setQuery] = useState("");

  const renderItem = ({ item }) => {
    return (
      <>
        <Image
          source={{
            uri: "https://demofree.sirv.com/nope-not-here.jpg",

            width: 200,
            height: 200,
          }}
        />
        <Item title={item.title} />
      </>
    );
  };

  const callSearchApi = async (query) => {
    const response = await fetch(
      `https://imdb8.p.rapidapi.com/auto-complete?q=${query}`,
      {
        method: "GET",
        headers: {
          "X-rapidapi-key":
            "30a79d49e4msh60149164f98a8a5p16accdjsn3726a274f766",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
      }
    );
    const responseJson = await response.json();
    // console.log(responseJson.d);
    setChars(responseJson.d);
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
          onChangeText={(text) => {
            console.log(text);
            setQuery(text);
            callSearchApi(text);
          }}
        />
      </View>
      <View style={{ height: "60%", marginTop: 20 }}>
        <ScrollView>
          <View>
            {query.length > 0 ? (
              <>
                {/* <FlatList
            data={chars}
            // renderItem={renderItem}
            renderItem={({ item }) => {
              return <Text>{item.v[0].l}</Text>;
            }}
            // keyExtractor={item => item.ID}
            keyExtractor={(item) => item.id}
          /> */}
                {chars ? (
                  chars.map((item, index) => {
                    return (
                      <View key={index}>
                        <Image
                          source={{
                            uri:
                              item.i && item.i.imageUrl
                                ? item.i.imageUrl
                                : "https://demofree.sirv.com/nope-not-here.jpg",

                            width: 200,
                            height: 200,
                          }}
                        />

                        <Text>{item.l}</Text>
                      </View>
                    );
                  })
                ) : (
                  <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                  />
                )}
              </>
            ) : (
              <View>
                <Text>no data</Text>
              </View>
            )}
          </View>
        </ScrollView>
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
