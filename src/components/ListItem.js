import {StyleSheet, Image, View, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

const ListItem = ({item, userFav, index, addFavorite}) => {
  return (
    <View key={index} style={styles.container}>
      <Image
        source={{
          uri: item,
        }}
        resizeMode={'stretch'}
        style={styles.image}
      />

      <TouchableOpacity
        onPress={() => addFavorite(item)}
        style={styles.favoriteWrapper}>
        {userFav.includes(item) ? (
          <Image
            style={styles.icon}
            source={require('../assets/fav-fill.png')}
          />
        ) : (
          <Image
            style={styles.icon}
            source={require('../assets/fav.png')}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    image:{width: width, height: height - StatusBar.currentHeight},
    favoriteWrapper:{
        position: 'absolute',
        top: 10,
        right: 10,
        height: 80,
        width: 20,
      },
      icon:{height: 30, width: 30}
});
