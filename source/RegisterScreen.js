import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../src/components/CustomText'

const RegisterScreen = ({ route }) => {
  const { id } = route?.params || ''
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <CustomText>Testing the share {id}</CustomText>
      <CustomText>Testing the share</CustomText>
      <CustomText>Testing the share</CustomText>
      <CustomText>Testing the share</CustomText>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})