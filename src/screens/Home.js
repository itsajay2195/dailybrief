import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  FlatList,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ListItem from '../components/ListItem';
import { fetchDogImages, setFavorites } from '../utils/helpers';



const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [userFav, setUserFav] = useState([]);

  useEffect(() => {
    fetchDogImages().then((data) => setData(data));
  }, []);

  useEffect(() => {
    setFavorites(userFav);
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
      {!data.length>0 ?<ActivityIndicator size={"large"} color={"red"}/>:null}
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
