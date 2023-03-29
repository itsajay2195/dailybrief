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

const {height,width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [userFav, setUserFav] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random/20')
      .then(response => response.json())
      .then(data => setData(data.message))
      .catch(error => console.error(error));
  }, [data]);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(data => {
      if (data) {
        setFavorites(JSON.parse(data));
      }
    });
  }, []);

  // useEffect(() => {
  //   AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  // }, [userFav]);

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
              // onPress={() => handleFavoritePress(item)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: userFav.includes(item)
                  ? 'yellow'
                  : 'transparent',
                padding: 10,
                borderRadius: 20,
              }}>
              <Text>{userFav.includes(item) ? 'Unfavorite' : 'Favorite'}</Text>
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
