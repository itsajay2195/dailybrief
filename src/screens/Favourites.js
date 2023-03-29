import { StyleSheet, Text, View,SafeAreaView, Platform, StatusBar, FlatList,Image , Dimensions, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState} from 'react'

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

  return (
    <SafeAreaView style={styles.container}>
      <Text>Favourites</Text>
      <FlatList
        data={userFav}
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
  )
}

export default Favourites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }})