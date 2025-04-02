import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CustomText from '../src/components/CustomText'

const Refer = ({route}) => {
  const {id} = route?.params || ''

  useEffect(() => {
    console.log("Received ID:", id); // Debugging log to confirm `id` value
  }, [id]);
  return (
    <View style={{alignItems:"center",flex:1,justifyContent:"center"}}>
    <CustomText>dasdas {id}</CustomText>
    <CustomText>dasdas {id}</CustomText>
    <CustomText>dasdas {id}</CustomText>
    <CustomText>dasdas {id}</CustomText>
 
    </View>
  )
}

export default Refer

const styles = StyleSheet.create({})