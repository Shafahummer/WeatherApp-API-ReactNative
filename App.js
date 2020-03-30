import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, YellowBox} from 'react-native';
// import _ from 'lodash';

const api1 = "https://api.openweathermap.org/data/2.5/weather?q=";
const api2 = "&appid=9e91db6cebab30cb3af0f4e628a21e12";


export default function App() {

  const [city, setCity] = useState("")
  const [weathery, setWeathery] = useState([])

  // useEffect(() => {
  //   YellowBox.ignoreWarnings(['Setting a timer']);
  //   const _console = _.clone(console);
  //   console.warn = message => {
  //     if (message.indexOf('Setting a timer') <= -1) {
  //       _console.warn(message);
  //     }
  //   };
  // });


  getData = () => {
    return fetch(api1 + city + api2)
      .then(response => response.json())
      .then(responseJson => {
        setWeathery(responseJson.weather)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function Item({ title }) {
    return (
      <View style={styles.itemView}>
        <Text style={{ fontSize: 24, color: "#192A56" }}>{title.main}</Text>
        <Text>Description:{title.description}</Text>
      </View>
    );
  }


  return (

    <View style={styles.container}>

      <View style={{ height: 100 }}></View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ borderWidth: 2, borderColor: "#000" }}>
          <TextInput
            style={{ paddingHorizontal: 40 }}
            placeholder="Enter the city"
            onChangeText={city => setCity(city)}
          />
        </View>

        <View style={{ marginTop: 40 }}>
          <Button
            title="click me"
            onPress={() => {
              getData()
            }}
          />
        </View>
      </View>


      <FlatList
        data={weathery}
        renderItem={({ item }) => <Item title={item} />}
        keyExtractor={item => item.id.toString()}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99AAAB'
  },
  itemView: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
});
