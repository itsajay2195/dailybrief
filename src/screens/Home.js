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
import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItem from '../components/ListItem';

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
    AsyncStorage.setItem('favorites', JSON.stringify(userFav));
  }, [userFav]);

  const addFavorite = useCallback((dogImage) => {
    setUserFav([...userFav, dogImage]);
    },[userFav]);
    
    // Remove dog image from favorites
    const removeFavorite = (dogImage) => {
    const updatedFavorites = userFav.filter((favorite) => favorite !== dogImage);
    setUserFav(updatedFavorites);
    };

  const listItem = ({item, index})=>{
    return <ListItem item={item} userFav={userFav} index={index} addFavorite={addFavorite} />
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={listItem}
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
