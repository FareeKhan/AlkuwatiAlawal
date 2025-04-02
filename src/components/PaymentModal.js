import { Modal, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { StripeProvider, CardField, useStripe, createToken } from '@stripe/stripe-react-native';
import { SP_KEY } from '../constants/data';
import CustomButton from './CustomButton';
import { color } from '../constants/color';
import CustomLoader from './CustomLoader';


const PaymentModal = ({ modalVisible, setModalVisible, setCardInfo, cardInfo, isLoading, setIsLoading, setToken }) => {

    onPress = async () => {
        setIsLoading(true)
        try {
            const resToken = await createToken({ ...cardInfo, type: 'Card' })
            if (resToken) {
                setToken(resToken);
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            setModalVisible(false)
            setIsLoading(false)
        }
    }

    return (
        <View>

            {
                modalVisible &&
                <Animated.View
                    style={styles.bgColor}
                />
            }
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>

                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ flex: 0.5, width: "100%" }} />

                        <View style={styles.modalView}>
                            <Text style={styles.titleTxt}>Enter Your Card Details</Text>
                            <StripeProvider
                                publishableKey={SP_KEY}
                                merchantIdentifier="merchant.identifier"
                            >
                                <CardField
                                    postalCodeEnabled={false}
                                    placeholders={{
                                        number: '4242 4242 4242 4242',
                                    }}
                                    cardStyle={{
                                        backgroundColor: '#FFFFFF',
                                        textColor: '#000000',
                                        placeholderColor: "#cecece",

                                    }}
                                    style={{
                                        width: '100%',
                                        height: 50,
                                    }}
                                    onCardChange={(cardDetails) => {
                                        console.log('cardDetails', cardDetails)
                                        if (cardDetails?.complete) {
                                            setCardInfo(cardDetails)
                                        } else {
                                            setCardInfo(null)
                                        }
                                    }}
                                    onFocus={(focusedField) => {
                                        console.log('focusField', focusedField);
                                    }}
                                />
                            </StripeProvider>

                            {
                                isLoading ?
                                    <CustomLoader
                                        style={{ width: "60%", marginVertical: 15 }}
                                    />

                                    :
                                    <CustomButton
                                        onPress={onPress}
                                        disabled={!cardInfo}
                                        title={'Submit'}
                                        style={{ width: "60%", marginVertical: 15 }}
                                    />
                            }
                        </View>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ flex: 0.5, width: "100%" }} />


                    </View>

                </Modal>
            </View>
        </View>
    )
}

export default PaymentModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    bgColor: {
        width: 1000,
        height: 100000,
        backgroundColor: "#00000080",
        left: -20,
        zIndex: 100,
        top: -1000
    },
    titleTxt: {
        alignSelf: "flex-start",
        paddingLeft: 15,
        marginTop: 30,
        fontSize: 16,
        fontFamily: "Montserrat-Medium",
        color: color.theme
    }
})