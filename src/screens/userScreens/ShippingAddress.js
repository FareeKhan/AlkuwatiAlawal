import {
  Alert,
  Platform,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  FlatList,
  I18nManager,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { color } from '../../constants/color';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {
  addShippingAddress,
  editAddress,
  editShippingAddress,
  userShippingAddress,
} from '../../services/UserServices';
import CustomLoader from '../../components/CustomLoader';
import { useDispatch, useSelector } from 'react-redux';
import { storeUserAddress } from '../../redux/reducer/UserShippingAddress';
import ScreenLoader from '../../components/ScreenLoader';
import HeaderLogo from '../../components/HeaderLogo';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDropDown from '../../components/CustomDropDown';
import ScreenView from '../../components/ScreenView';

const ShippingAddress = ({ navigation, route }) => {
  const { id,btnText } = route.params ?? '';
  const dispatch = useDispatch();

  const [userAddress,setUserAddress] = useState({})
  const displayNumber = userAddress?.phone?.startsWith('+965') ? userAddress?.phone.slice(4) : userAddress?.phone;
  const [fullName, setFullName] = useState(userAddress?.full_name);
  const [street, setStreet] = useState(userAddress?.street);
  const [city, setCity] = useState(userAddress?.city);
  const [area, setArea] = useState(userAddress?.area);
  const [phoneNumber, setPhoneNumber] = useState(displayNumber);
  const [piece, setPiece] = useState(userAddress?.piece);
  const [email, setEmail] = useState(userAddress?.email);
  const [zipCode, setZipCode] = useState(userAddress?.zipCode);
  const [countryCode, setCountryCode] = useState(userAddress?.countryCode);
  const [address, setAddress] = useState(userAddress?.address);
  const [country, setCountry] = useState(userAddress?.country);
  const [isLoader, setIsLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [showGover, setShowGover] = useState(false);


  // const userAddress = useSelector(
  //   state => state?.customerAddress,
  // );
  // const userAddress = useSelector((state) => state?.customerAddress?.storeAddress)
  // const userAddress = {}
  const userId = useSelector(state => state.auth.userId);
  const { t } = useTranslation();

  useEffect(()=>{
    handleEdit()
  },[]) 

  useEffect(()=>{
    const displayNumber = userAddress?.phone?.startsWith('+965') ? userAddress?.phone.slice(4) : userAddress?.phone;
    setFullName(userAddress?.full_name)
    setCity(userAddress?.city)
    setArea(userAddress?.area)
    setPhoneNumber(displayNumber)
    setPiece(userAddress?.street)
    setEmail(userAddress?.email)
    setCountry(userAddress?.country)
  },[userAddress])

  console.log('showiiiin',fullName)


  const handleEdit = async () => {
    try {
        const response = await editAddress(id)
        console.log('showMeAEddit', response)
        if (response?.data?.length>0) {
          setUserAddress(response?.data[0])
        }
    } catch (error) {
        console.log('error', error)
    }
}


  const countries_ar = [
    {
      label: 'الكويت',
      id: 1
    },
    {
      label: 'المملكة العربية السعودية',
      id: 2
    },
    {
      label: 'الإمارات العربية المتحدة',
      id: 3
    },
    {
      label: 'البحرين',
      id: 4
    },
    {
      label: 'قطر',
      id: 5
    },
    {
      label: 'عمان',
      id: 6
    }
  ];
  
  const countries_en = [
    {
      label: t('Kuwait'),
      id: 1
    },
    {
      label: t('Saudi Arabia'),
      id: 2
    },
    {
      label: t('United Arab Emirates'),
      id: 3
    },
    {
      label: t('Bahrain'),
      id: 4
    },
    {
      label: t('Qatar'),
      id: 5
    },
    {
      label: t('Oman'),
      id: 6
    }
  ];
  
  const governorate_ar = [
    {
      label: 'محافظة العاصمة',
      id: 1
    },
    {
      label: 'محافظة حولي',
      id: 2
    },
    {
      label: 'محافظة الأحمدي',
      id: 3
    },
    {
      label: 'محافظة الجهراء',
      id: 4
    },
    {
      label: 'محافظة الفروانية',
      id: 5
    },
    {
      label: 'محافظة مبارك الكبير',
      id: 6
    },

  ];

  const governorate_en = [
    {
      label: 'Al Asima',
      id: 1
    },
    {
      label: 'Hawally',
      id: 2
    },
    {
      label: 'Mubarak Al Kabir',
      id: 3
    },
    {
      label: 'Ahmadi',
      id: 4
    },
    {
      label: 'Farwaniya',
      id: 5
    },
    {
      label: 'Jahra',
      id: 6
    },
  ];

  // useEffect(() => { }, [userAddress]);

  const handlePress = async () => {
    // console.log(phoneNumber?.slice(1),'phoneNumber')
console.log('trending')
    if(fullName== ''|| piece == '' || city == '' || piece == '' || email == '' || area == '' || country == ''){
      alert(t('fillAll'))
      return
    }
    setIsLoader(true)
    try {
      if (phoneNumber.length == 8) {
        let updatedPhoneNumber =
          phoneNumber[0] === '0' ? phoneNumber.slice(1) : phoneNumber;
        updatedPhoneNumber = '+965' + updatedPhoneNumber;
        const addressredux = {
          fullName: fullName,
          street: piece,
          city: city,
          piece: piece,
          email: email,
          area: area,
          phone: updatedPhoneNumber,
          country: country,
        };
        console.log(addressredux, 'addressredux');
        const response = await (userAddress ? editShippingAddress(addressredux,userId,id):  addShippingAddress(addressredux,userId))
       
       console.log('robinnnnn',response)
        if (response?.data) {
          dispatch(storeUserAddress({ ...addressredux, addressId:id?id: response.data.id }));
          setIsLoader(false)
            Alert.alert(
          t(''), 
          t('addressSaved'), 
          [
            { text: t('ok'), onPress: () => navigation.goBack() }
          ],
          {
            textAlign: I18nManager.isRTL ? 'right' : 'left'  // Align title based on language direction
          }
        );
        }else{
          console.log('sss',response)
        }




        // Alert.alert(
        //   t(''), 
        //   t('addressSaved'), 
        //   [
        //     { text: t('ok'), onPress: () => navigation.goBack() }
        //   ],
        //   {
        //     textAlign: I18nManager.isRTL ? 'right' : 'left'  // Align title based on language direction
        //   }
        // );
        // if (userAddress) {
        //   // navigation.navigate('OrderDetails', {
        //   //   totalPrice: totalPrice,
        //   //   userAddressA: userAddress,
        //   // });
        // }
      } else if (phoneNumber.length > 8) {
        Alert.alert(t('isNotValid'));
  
      }
      else {
        Alert.alert(t('fillNo'));
  
      }
    } catch (error) {
      console.log('error',error)
    }finally{
      setIsLoader(false)
    }
  
    //setIsLoader(true)
    /* try {
             const response = await addShippingAddress(fullName, street, city, area, phoneNumber, address, zipCode, countryCode, country, userId)
             if (response) {
                 setIsLoader(false)
                 dispatch(storeUserAddress(response?.data))
                 if (btnText == 'Save') {
                     alert('Data saved successfully')
                 } else {
                     navigation.navigate('OrderDetails', {
                         totalPrice: totalPrice
                     })
                 }
 
             } else {
                 setIsLoader(false)
                 alert('Your Data is not Correct')
 
             }
         } catch (error) {
             setIsLoader(false)
             console.log(error)
         }*/
  };


  // const getShippingAddress = async () => {
  //   setLoader(true);
  //   try {
  //     const response = await userShippingAddress(userId);
  //     console.log('response',response)
  //     if (response) {
  //       setLoader(false);
  //       dispatch(
  //         storeUserAddress(response?.data?.[response?.data?.length - 1]),
  //       );
  //     } else {
  //       alert('something went wrong');
  //       setLoader(false);
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //     console.log(error);
  //   }
  // };

  if (loader) {
    return <ScreenLoader />;
  }

  console.log('country',country)

  return (
    <ScreenView scrollable={true} style={{paddingTop:40}}>
        <View style={styles.headerContainer}>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              size={40}
              name={
                I18nManager.isRTL
                  ? 'chevron-forward-circle'
                  : 'chevron-back-circle'
              }
              color={color.theme}
            />
          </TouchableOpacity>
          {btnText !== undefined && (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
              }}>
              <HeaderLogo />
            </View>
          )}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.productName]}>{t('shipaddress')}</Text>
        </View>
{/* 
        <CustomInput
          placeholder={t('email')}
          title={t('email')}
          style={{ marginTop: 20 }}
          value={email}
          onChangeText={setEmail}
          autoCapitalize={false}
          keyboardType={'email'}
        /> */}
        <View style={{ marginTop: 20 }}>
          <Text
            style={{ textAlign: 'left', marginBottom: 10, color: color.theme }}>
            {t('phoneNumber')}
          </Text>
          <View
            style={{
              flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
              justifyContent: I18nManager.isRTL ? 'flex-end' : 'flex-start',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              // paddingBottom: 10,
            }}>
            <Text style={{ color: "#000" }}>{'\u2066+965\u2069'}</Text>
            <TextInput
              placeholder={t('phoneNumber')}
              value={phoneNumber}
              keyboardType="number-pad"
              onChangeText={setPhoneNumber}
              autoCorrect={false}
              maxLength={10}
              style={{ color: "#000",     textAlign: "left", writingDirection:"rtl" }}
              placeholderTextColor={"#cecece"}
            />
          </View>
        </View>
        <CustomInput
          placeholder={t('typename')}
          title={t('fName')}
          style={{ marginTop: 20 }}
          value={fullName}
          onChangeText={setFullName}
        />

        <CustomInput
          placeholder={t('avenue')}
          title={t('avenue')}
          style={{ marginTop: 20 }}
          value={piece}
          onChangeText={setPiece}
        />

        <CustomInput
          placeholder={t('City')}
          title={t('City')}
          style={{ marginTop: 20 }}
          value={city}
          onChangeText={setCity}
        />


        <CustomDropDown
          data={I18nManager.isRTL ? countries_ar : countries_en}
          title={t('Country')}
          placeholder={t('Country')}
          setValue={setCountry}
          value={country}
        />

{
  country == t('Kuwait') ? 
  <CustomDropDown
  data={I18nManager.isRTL ? governorate_ar : governorate_en}
  title={t('governorate')}
  placeholder={t('governorate')}
  setValue={setArea}
  value={area}
/>

:
<View>


<Text
style={{ textAlign: 'left', marginBottom: 10, color: color.theme,marginTop:20 }}>
{t('governorate')}

</Text>

<TextInput
       placeholder={t('governorate')}
              value={area}
              onChangeText={setArea}
              autoCorrect={false}
              maxLength={10}
              style={{ color: "#000", paddingHorizontal:10,textAlign:I18nManager.isRTL? "right": "left", writingDirection:"rtl",       backgroundColor: '#cccccc70',borderRadius:7 }}
              placeholderTextColor={"#cecece"}
            />
</View>

}
       
     


        <View style={{ marginTop: 50 }}>
          {isLoader ? (
            <CustomLoader />
          ) : (
            <CustomButton
              title={btnText !== undefined ? btnText : t('save')}
              onPress={handlePress}
              disabled={
                btnText == 'Save' &&
                fullName == userAddress?.full_name &&
                city == userAddress?.city &&
                area == userAddress?.area &&
                phoneNumber == userAddress?.phone &&
                piece == userAddress?.piece &&
                // governorate == userAddress?.governorate &&
                country == userAddress?.country
              }
            />
          )}
        </View>
{/* </KeyboardAvoidingView> */}
    </ScreenView>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({
 
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '70%',
  },
  logoBox: {
    marginLeft: 'auto',
    marginRight: 'auto',
    right: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: color.theme,
    fontFamily: 'Montserrat-Bold',
  },
});









































// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TextInput,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Keyboard,
//   FlatList,
//   I18nManager,
// } from 'react-native';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import ExportSvg from '../../constants/ExportSvg';
// import { color } from '../../constants/color';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import {
//   addShippingAddress,
//   userShippingAddress,
// } from '../../services/UserServices';
// import CustomLoader from '../../components/CustomLoader';
// import { useDispatch, useSelector } from 'react-redux';
// import { storeUserAddress } from '../../redux/reducer/UserShippingAddress';
// import ScreenLoader from '../../components/ScreenLoader';
// import HeaderLogo from '../../components/HeaderLogo';
// import { loginData } from '../../redux/reducer/Auth';
// import { useTranslation } from 'react-i18next';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const ShippingAddress = ({ navigation, route }) => {
//   const { totalPrice } = route?.params || '';
//   const { btnText } = route.params ?? '';
//   const userAddress = useSelector(
//     state => state?.customerAddress?.storeAddress,
//   );
//   const userId = useSelector(state => state.auth.userId);
//   const { t } = useTranslation();
//   // forStoring zipCode and countryCode i am using Api param block_avenue and emirates
//   const dispatch = useDispatch();

//   const displayNumber = userAddress?.phone?.startsWith('+965') ? userAddress?.phone.slice(4) : userAddress?.phone;
//   const [fullName, setFullName] = useState(userAddress?.fullName);
//   const [street, setStreet] = useState(userAddress?.street);
//   const [city, setCity] = useState(userAddress?.city);
//   const [area, setArea] = useState(userAddress?.area);
//   const [phoneNumber, setPhoneNumber] = useState(displayNumber);
//   const [piece, setPiece] = useState(userAddress?.piece);
//   const [email, setEmail] = useState(userAddress?.email);
//   const [zipCode, setZipCode] = useState(userAddress?.zipCode);
//   const [countryCode, setCountryCode] = useState(userAddress?.countryCode);
//   const [address, setAddress] = useState(userAddress?.address);
//   const [country, setCountry] = useState(userAddress?.country);
//   const [isLoader, setIsLoader] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [showCountry, setShowCountry] = useState(false);
//   const [showGover, setShowGover] = useState(false);


//   const openPicker = useCallback(() => {
//     Keyboard.dismiss();
//     setShowCountry(true);
//   }, [showCountry]);

//   const hidePicker = useCallback(
//     item => {
//       setShowCountry(false);
//       setCountry(item);
//     },
//     [showCountry, country],
//   );

//   const openPickerGover = useCallback(() => {
//     Keyboard.dismiss();
//     setShowGover(true);
//   }, [showGover]);

//   const hidePickerGover = useCallback(
//     item => {
//       setShowGover(false);
//       setArea(item);
//     },
//     [showGover, area],
//   );

//   useEffect(() => {
//     //getShippingAddress()
//   }, []);

//   const countries_ar = ['الكويت'];
//   const countries_en = ['Kuwait'];

//   const governorate_ar = [
//     'محافظة العاصمة',
//     'محافظة حولي',
//     'محافظة الأحمدي',
//     'محافظة الجهراء',
//     'محافظة الفروانية',
//     'محافظة مبارك الكبير',
//   ];

//   const governorate_en = [
//     'Al Asima',
//     'Hawally',
//     'Mubarak Al Kabir',
//     'Ahmadi',
//     'Farwaniya',
//     'Jahra',
//   ];

//   useEffect(() => { }, [userAddress]);

//   const handlePress = async () => {
//     // console.log(phoneNumber?.slice(1),'phoneNumber')
//     if (phoneNumber.length == 8) {
//       let updatedPhoneNumber =
//         phoneNumber[0] === '0' ? phoneNumber.slice(1) : phoneNumber;
//       updatedPhoneNumber = '+965' + updatedPhoneNumber;
//       const addressredux = {
//         fullName: fullName,
//         street: street,
//         city: city,
//         piece: piece,
//         email: email,
//         area: area,
//         phone: updatedPhoneNumber,
//         zipCode: zipCode,
//         countryCode: countryCode,
//         address: address,
//         country: country,
//       };
//       console.log(addressredux, 'addressredux');
//       dispatch(storeUserAddress(addressredux));
//       if (userAddress) {
//         navigation.navigate('OrderDetails', {
//           totalPrice: totalPrice,
//           userAddressA: userAddress,
//         });
//       }
//     } else if (phoneNumber.length > 8) {
//       Alert.alert(t('isNotValid'));

//     }
//     else {
//       Alert.alert(t('fillNo'));

//     }

//     //setIsLoader(true)
//     /* try {
//              const response = await addShippingAddress(fullName, street, city, area, phoneNumber, address, zipCode, countryCode, country, userId)
//              if (response) {
//                  setIsLoader(false)
//                  dispatch(storeUserAddress(response?.data))
//                  if (btnText == 'Save') {
//                      alert('Data saved successfully')
//                  } else {
//                      navigation.navigate('OrderDetails', {
//                          totalPrice: totalPrice
//                      })
//                  }
 
//              } else {
//                  setIsLoader(false)
//                  alert('Your Data is not Correct')
 
//              }
//          } catch (error) {
//              setIsLoader(false)
//              console.log(error)
//          }*/
//   };

//   const otpverify = () => {
//     /*if(userAddress?.phone){
//             navigation.navigate('VerifyCode', {
//                 totalPrice: totalPrice,
//                 phoneNo: userAddress?.phone,
//                 address: userAddress
//             })
//         }else{
// Alert.alert("Please fill the address.");
//         }*/
//   };

//   const getShippingAddress = async () => {
//     setLoader(true);
//     try {
//       const response = await userShippingAddress(userId);
//       if (response) {
//         setLoader(false);
//         dispatch(
//           storeUserAddress(response?.data?.[response?.data?.length - 1]),
//         );
//       } else {
//         alert('something went wrong');
//         setLoader(false);
//       }
//     } catch (error) {
//       setLoader(false);
//       console.log(error);
//     }
//   };

//   if (loader) {
//     return <ScreenLoader />;
//   }

//   return (
//     <ScrollView style={styles.mainContainer}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons
//             size={40}
//             name={
//               I18nManager.isRTL
//                 ? 'chevron-forward-circle'
//                 : 'chevron-back-circle'
//             }
//             color={color.theme}
//           />
//         </TouchableOpacity>
//         {btnText !== undefined && (
//           <View
//             style={{
//               flexDirection: 'row',
//               width: '100%',
//               justifyContent: 'center',
//             }}>
//             <HeaderLogo />
//           </View>
//         )}
//       </View>
//       <View style={{ flexDirection: 'row' }}>
//         <Text style={[styles.productName]}>{t('shipaddress')}</Text>
//       </View>

//         {/* <ScrollView
//           style={{ flex: 1 }}
//           // keyboardShouldPersistTaps="handled"
//           // contentContainerStyle={{ flexGrow: 1 }}
//           showsVerticalScrollIndicator={false}> */}
//                   {/* <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
//           <CustomInput
//             placeholder={t('email')}
//             title={t('email')}
//             style={{ marginTop: 20 }}
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize={false}
//             keyboardType={'email'}
//           />
//           {/* <CustomInput
//                         placeholder={t('phoneNumber')}
//                         // title={t('phoneNumber')}
//                         style={{ marginTop: 20 }}
//                         value={phoneNumber}
//                         autoCorrect={false}
//                         keyboardType='number-pad'
//                         onChangeText={setPhoneNumber}
//                     /> */}
//           <View style={{ marginTop: 20 }}>
//             <Text
//               style={{ textAlign: 'left', marginBottom: 10, color: color.theme }}>
//               {t('phoneNumber')}
//             </Text>
//             <View
//               style={{
//                 flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
//                 justifyContent: I18nManager.isRTL ? 'flex-end' : 'flex-start',
//                 alignItems: 'center',
//                 borderBottomWidth: 1,
//                 borderBottomColor: '#ccc',
//                 // paddingBottom: 10,
//               }}>
//               <Text style={{color:"#000"}}>{'\u2066+965\u2069'}</Text>
//               <TextInput
//                 placeholder={t('phoneNumber')}
//                 value={phoneNumber}
//                 keyboardType="number-pad"
//                 onChangeText={setPhoneNumber}
//                 autoCorrect={false}
//                 maxLength={10}
//                 style={{ color: "#000" }}
//                 placeholderTextColor={"#cecece"}
//               />
//             </View>
//           </View>
//           <CustomInput
//             placeholder={t('typename')}
//             title={t('fName')}
//             style={{ marginTop: 20 }}
//             value={fullName}
//             onChangeText={setFullName}
//           />

//           <CustomInput
//             placeholder={t('avenue')}
//             title={t('avenue')}
//             style={{ marginTop: 20 }}
//             value={piece}
//             onChangeText={setPiece}
//           />

//           <CustomInput
//             placeholder={t('EStreet')}
//             title={t('Street')}
//             style={{ marginTop: 20 }}
//             value={street}
//             onChangeText={setStreet}
//           />

//           <CustomInput
//             placeholder={t('City')}
//             title={t('City')}
//             style={{ marginTop: 20 }}
//             value={city}
//             onChangeText={setCity}
//           />
//           <View
//             style={{
//               position: 'relative',
//               backgroundColor: 'white',
//               zIndex: 2662,
//             }}>
//             <CustomInput
//               placeholder={t('governorate')}
//               title={t('governorate')}
//               style={{ marginTop: 20 }}
//               value={area}
//               onChangeText={openPickerGover}
//               onBlur={() => {
//                 openPickerGover;
//               }}
//               onFocus={openPickerGover}
//             />
//             {showGover ? (
//               <>
//                 <FlatList
//                   style={{
//                     backgroundColor: 'white',
//                     borderWidth: 1,
//                     borderColor: '#ccc',
//                     borderRadius: 5,
//                     elevation: 1,
//                     zIndex: 2662,
//                     maxHeight: 150,
//                     width: '100%',
//                     marginTop: 80,
//                     position: 'absolute',
//                   }}
//                   data={I18nManager.isRTL ? governorate_ar : governorate_en}
//                   renderItem={({ item, index }) => (
//                     <TouchableOpacity onPress={() => hidePickerGover(item)}>
//                       <Text
//                         style={{
//                           padding: 8,
//                           width: '100%',
//                           borderBottomWidth: 1,
//                           borderColor: 'grey',
//                           color:"#000"
//                         }}>
//                         {item}
//                       </Text>
//                     </TouchableOpacity>
//                   )}
//                   keyExtractor={item => item}
//                 />
//               </>
//             ) : null}
//           </View>

//           {/* <CustomInput
//                         placeholder={t('taddress')}
//                         title={t('Address')}
//                         style={{ marginTop: 20 }}
//                         value={address}
//                         onChangeText={setAddress}
//                     />

//                     <CustomInput
//                         placeholder={t('tzc')}
//                         title={t('zc')}
//                         style={{ marginTop: 20 }}
//                         value={zipCode}
//                         onChangeText={setZipCode}
//                     />
//                     <CustomInput
//                         placeholder={'+971'}
//                         title={t('CountryCode')}
//                         style={{ marginTop: 20 }}
//                         value={countryCode}
//                         onChangeText={setCountryCode}
//                     />*/}
//           <View
//             style={{
//               position: 'relative',
//               marginBottom: 100,
//               backgroundColor: 'white',
//             }}>
//             <CustomInput
//               placeholder={t('Country')}
//               title={t('Country')}
//               style={{ marginVertical: 20 }}
//               value={country}
//               onChangeText={openPicker}
//               onBlur={() => {
//                 openPicker;
//               }}
//               onFocus={openPicker}
//             />

//             {showCountry ? (
//               <>
//                 <FlatList
//                   style={{
//                     backgroundColor: 'white',
//                     borderWidth: 1,
//                     borderColor: '#ccc',
//                     borderRadius: 5,
//                     elevation: 1,
//                     zIndex: 2662,
//                     maxHeight: 150,
//                     width: '100%',
//                     marginTop: 80,
//                     position: 'absolute',
//                   }}
//                   data={I18nManager.isRTL ? countries_ar : countries_en}
//                   renderItem={({ item, index }) => (
//                     <TouchableOpacity onPress={() => hidePicker(item)}>
//                       <Text
//                         style={{
//                           padding: 8,
//                           width: '100%',
//                           borderBottomWidth: 1,
//                           borderColor: 'grey',
//                           color:"#000"
//                         }}>
//                         {item}
//                       </Text>
//                     </TouchableOpacity>
//                   )}
//                   keyExtractor={item => item}
//                 />
//               </>
//             ) : null}
//           </View>
//           <View style={{ marginBottom: 100 }}>
//             {isLoader ? (
//               <CustomLoader />
//             ) : (
//               <CustomButton
//                 title={btnText !== undefined ? btnText : t('save')}
//                 onPress={handlePress}
//                 disabled={
//                   btnText == 'Save' &&
//                   fullName == userAddress?.full_name &&
//                   street == userAddress?.street &&
//                   city == userAddress?.city &&
//                   area == userAddress?.area &&
//                   phoneNumber == userAddress?.phone &&
//                   piece == userAddress?.piece &&
//                   // governorate == userAddress?.governorate &&
//                   country == userAddress?.country
//                 }
//               />
//             )}
//           </View>
//           {/* </KeyboardAvoidingView>
//         </ScrollView> */}
//     </ScrollView>
//   );
// };

// export default ShippingAddress;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     paddingTop: Platform.OS == 'ios' ? 40 : 35,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     width: '70%',
//   },
//   logoBox: {
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     right: 10,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: color.theme,
//     fontFamily: 'Montserrat-Bold',
//   },
// });
