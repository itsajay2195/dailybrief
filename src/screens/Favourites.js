import { StyleSheet, Text, View,SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'

const Favourites = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Favourites</Text>
    </SafeAreaView>
  )
}

export default Favourites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }})