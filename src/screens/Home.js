import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  Dimensions
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height,width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [userFav, setUserFav] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random/20')
      .then(response => response.json())
      .then(data => setData(data.message))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(data => {
      if (data) {
        setUserFav(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(userFav));
  }, [userFav]);

  const addFavorite = (dogImage) => {
    setUserFav([...userFav, dogImage]);
    };
    
    // Remove dog image from favorites
    const removeFavorite = (dogImage) => {
    const updatedFavorites = userFav.filter((favorite) => favorite !== dogImage);
    setUserFav(updatedFavorites);
    };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View key={index} style={{flex: 1}}>
            <Image
              source={{
                uri: item,
              }}
              resizeMode={'stretch'}

              style={{width: width, height: height-StatusBar.currentHeight}}
            />

            <TouchableOpacity
              onPress={() => addFavorite(item)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                height:80,
                width:20,
              
              }}>
              {userFav.includes(item) ? <Image style={{height:30,width:30}} source={require("../assets/fav-fill.png")}/>: <Image style={{height:30, width:30}} source={require("../assets/fav.png")}/>}
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
