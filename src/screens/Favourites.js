import { StyleSheet, Text, View,SafeAreaView, Platform, StatusBar, FlatList,Image , Dimensions, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState} from 'react';
import ListItem from '../components/ListItem';
import { getFavorites } from '../utils/helpers';

const {height,width} = Dimensions.get('window');

const Favourites = () => {
  const [userFav,setUserFav] = useState([])
  useEffect(() => {
    AsyncStorage.getItem('favorites').then(data => {
      if (data) {
        setUserFav(JSON.parse(data));
      }
    });
  }, );

  const listItem = ({item, index})=>{
    return <ListItem item={item} userFav={userFav} index={index}  />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userFav}
        keyExtractor={(item, index) => index.toString()}
        renderItem={listItem}
      />
    </SafeAreaView>
  )
}

export default Favourites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }})