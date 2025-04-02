import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../src/components/CustomText'

const ReferEarn = ({navigation}) => {
  const id =1234567890
  const shareLink = `https://nextjs-sample-ten-cyan.vercel.app/refer/refer/${id}`;
 
  const handleInvite = async () => {
    try {
      await Share.share({ message: `${shareLink}` });
    } catch (error) {
      console.error("Error sharing invite link:", error);
    }
  };
  // onPress={()=>navigation.navigate('RegisterScreen',{
  //   id:12345678
  // })} 
  return (
    <View>
      <CustomText>Hello this is Refer & Earn</CustomText>

      <TouchableOpacity 
      onPress={()=>handleInvite()}
      style={{ backgroundColor: "orange", alignItems: "center", paddingVertical: 20 }}>
        <CustomText>Share the button</CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default ReferEarn

const styles = StyleSheet.create({})