import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ReferEarn from './ReferEarn';
import RegisterScreen from './RegisterScreen';
import Refer from './Refer';

const AppNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='ReferEarn' screenOptions={{headerShown:false}}>
      <Stack.Screen name='ReferEarn' component={ReferEarn} /> 
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} /> 
      <Stack.Screen name='Refer' component={Refer} /> 
    </Stack.Navigator>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})