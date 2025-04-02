import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ScreenView from '../../components/ScreenView'
import HeaderBox from '../../components/HeaderBox'
import CustomText from '../../components/CustomText'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { color } from '../../constants/color'
import { deleteAddress, userShippingAddress } from '../../services/UserServices'
import { storeUserAddress } from '../../redux/reducer/UserShippingAddress'
import { useTranslation } from 'react-i18next'
import { Swipeable } from 'react-native-gesture-handler'
import ScreenLoader from '../../components/ScreenLoader'
import { useFocusEffect } from '@react-navigation/native'

const SavedAddresses = ({ navigation, route }) => {
    const { t } = useTranslation()
    const { isAdd } = route?.params || {}
    const userId = useSelector((state) => state.auth?.userId)
    const userAddress = useSelector((state) => state?.customerAddress?.storeAddress)
    const addressId =isAdd?'': userAddress?.addressId
    const [data, setData] = useState()
    const [loader, setLoader] = useState(false)
    const [selectedItem, setSelectedItem] = useState(addressId)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     getShippingAddress()
    // }, [userId])

    useFocusEffect(
        useCallback(() => {
            getShippingAddress(); // Call the API again when the screen is focused
        }, [userId])
    );


    const getShippingAddress = async () => {
        setLoader(true);
        try {
            const response = await userShippingAddress(userId);
            if (response?.data?.length > 0) {
                setData(response?.data)
                setLoader(false);

            } else {
                alert('something went wrong');
                setLoader(false);
            }
        } catch (error) {
            setLoader(false);
            alert(error);
        } finally {
            setLoader(false);
        }
    };

    const handleAddress = (item) => {
        setSelectedItem(item?.id)
        console.log('hellot testing address', item)
        const addressredux = {
            fullName: item?.full_name,
            street: item?.street,
            city: item?.city,
            piece: item?.street,
            email: item?.email,
            area: item?.area,
            phone: item?.phone,
            country: item?.country,
            addressId: item?.id
        };
        dispatch(storeUserAddress(addressredux));
    }


    const handleDelete = async (id) => {
        try {
            const response = await deleteAddress(id)
            if (response?.status) {
                alert(t('addressDeleted'))
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    // const rightSwipe = (id) => {
    //     return (
    //         <View style={styles.rightSwipeContainer}>
    //             <TouchableOpacity onPress={() => handleDelete(id)} style={styles.deleteButton}>
    //                 <Text style={{ color: 'red' }}>{t('delete')}</Text>
    //             </TouchableOpacity>

    //             <TouchableOpacity onPress={() => alert('Edit Pressed')} style={styles.editButton}>
    //                 <Text style={styles.swipeText}>{t('edit')}</Text>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }

    const AddressLine = ({ label, value }) => (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10
            // height: 10,
        }}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>: </Text>
            <Text style={styles.value}>{value}</Text>

        </View>
    );


    const renderItem = ({ item, index }) => {
        return (
            // <Swipeable renderRightActions={() => rightSwipe(item?.id)}>
            <TouchableOpacity onPress={() => handleAddress(item)} style={[styles.userAddressBox, selectedItem == item?.id && { borderColor: color.theme }]} >
                <View >
                    <AddressLine label={t('Street')} value={item?.street} />
                    <AddressLine label={t('City')} value={item?.city} />
                    <AddressLine label={t('governorate')} value={item?.area} />
                    <AddressLine label={t('phoneNumber')} value={`\u2066${item?.phone}\u2069`} />
                    <AddressLine label={t('Country')} value={item?.country} />
                </View>

                {/* <View>
                    <CustomText> {item?.country}{item?.city} {item?.area} {item?.street} </CustomText>
                    <CustomText>{`\u2066${item?.phone}\u2069`}</CustomText>
                </View>*/}
                {
                    selectedItem == item?.id &&
                    <Ionicons name={'checkmark-circle'} color={color.theme} size={20} />
                }
            </TouchableOpacity>
            // </Swipeable>
        )
    }



    if (loader) {
        return <ScreenLoader />;
    }

    return (
        <ScreenView>
            <HeaderBox
                style={{ width: "75%" }}
            />

            {
                isAdd &&
                <TouchableOpacity style={{ borderWidth: 1, alignSelf: "baseline", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5, borderColor: "#cecece" }} onPress={() => navigation.navigate('ShippingAddress')}>
                    <CustomText style={{ fontSize: 16, fontWeight: "600", color: color.theme, textAlign: "left" }}>+ {t('addNew')}</CustomText>
                </TouchableOpacity>
            }


            <View style={{ flex: 1, marginTop: 30 }}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index?.toString()}
                    style={{ flexGrow: 1 }}
                    ItemSeparatorComponent={<View style={{ marginBottom: 20 }} />}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    renderItem={renderItem}
                />
            </View>
        </ScreenView>
    )
}

export default SavedAddresses

const styles = StyleSheet.create({
    swipeText: {
        color: "#000",
    },
    editButton: {
        backgroundColor: '#fff',
        height: "87%",
        width: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    deleteButton: {
        backgroundColor: '#fff',
        // height: "87.5%",
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderColor: "#00000020",
    },
    rightSwipeContainer: {
        flexDirection: "row",
    },
    userAddressBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: "#fff",
        // elevation: 5,
        borderWidth: 1,
        borderColor: "#00000020",

        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between"
        // marginVertical: 15
    },
    label: {
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        color: color.theme,
        textAlign: 'left',
        marginRight: 2
    },
    value: {
        color: color.grayShade,
        fontWeight: "400",
        fontFamily: "Montserrat-Regular",
        textAlign: 'left',



    },
})