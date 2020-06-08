import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import Navigation from 'react-navigation'
import * as Expo from 'expo'
import {PropTypes} from 'prop-types'
import Constants from 'expo-constants'
import Search from './Screens/SearchScreen'
import Movie from './Screens/MovieScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

   const Stack = createStackNavigator();



export default class App extends React.Component {


  render() {
    return (
      <View style={styles.container}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Movie" component={Movie} options={({route})=>({title: route.params.title})}/>
      
      </Stack.Navigator>
    </NavigationContainer>
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

