import {StyleSheet, Image, View, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

const ListItem = ({item, userFav, index, addFavorite}) => {
  return (
    <View key={index} style={{flex: 1}}>
      <Image
        source={{
          uri: item,
        }}
        resizeMode={'stretch'}
        style={{width: width, height: height - StatusBar.currentHeight}}
      />

      <TouchableOpacity
        onPress={() => addFavorite(item)}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          height: 80,
          width: 20,
        }}>
        {userFav.includes(item) ? (
          <Image
            style={{height: 30, width: 30}}
            source={require('../assets/fav-fill.png')}
          />
        ) : (
          <Image
            style={{height: 30, width: 30}}
            source={require('../assets/fav.png')}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
