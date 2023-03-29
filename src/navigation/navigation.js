import React from 'react';
import {Image, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Favourites from '../screens/Favourites';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function RootNavigation() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
          style={{flex: 1}}>
          <Tab.Navigator>
            <Tab.Screen
              name="HomeScreen"
              component={Home}
              options={{
                headerShown:false,
                tabBarIcon: ({ color }) => <Image style={{height:24,width:24}} source={require("../assets/home.png")} />,
              }}
            />
            <Tab.Screen
              name="FavouritesScreen"
              component={Favourites}
              options={{
                headerShown:false,
                tabBarIcon: ({ color }) => <Image style={{height:24,width:24}} source={require("../assets/fav-fill.png")} />,
              }}
            />
          </Tab.Navigator>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default RootNavigation;
