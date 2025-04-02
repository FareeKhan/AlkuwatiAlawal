import {
  Dimensions,
  FlatList,
  LogBox,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import ExportSvg from '../../constants/ExportSvg';
import { color } from '../../constants/color';
import { getSameProduct } from '../../services/UserServices';
import ScreenLoader from '../../components/ScreenLoader';
import SingleProductCard from '../../components/SingleProductCard';
import axios from 'axios';
import { setup } from 'axios-cache-adapter';


import SearchModal from '../../components/SearchModal';

const ITEM_WIDTH = Dimensions.get('window').width * 0.8;

import * as Animatable from 'react-native-animatable';
import {

  fetchCategoryProducts,
  categoriesListSub,
} from '../../services/UserServices';
import EmptyScreen from '../../components/EmptyScreen';
import { useTranslation } from 'react-i18next';


import HeaderBox from '../../components/HeaderBox';

import CustomLoader from '../../components/CustomLoader';



const cache = setup({
  cache: {
    maxAge: 15 * 60 * 1000, // Cache data for 15 minutes
  },
});

const SameProduct = ({ navigation, route }) => {


  const { text, subC_ID, selected, navID } = route?.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [storeData, setStoreData] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const [productLoader, setProductLoader] = useState(false);
  const [selectedCat, setSelectedCat] = useState();
  const [storeCategories, setStoreCategories] = useState();
  const { t } = useTranslation();


  const animationMain = 'fadeInRight';
  const durationInner = 1000;
  const delayInner = 100;

  const getCatList = async () => {
    setIsLoader(true);
    try {
      const response = await categoriesListSub(subC_ID);
      console.log('response', response);
      if (response?.status) {
        setIsLoader(false);
        if (response?.data) {
          funCategories(selected ? selected : response?.data[0].name);
        }
        setStoreCategories(response?.data);
      }
    } catch (error) {
      setIsLoader(false);
      console.log(error);
    }
  };

  const [categoriesData, setCategoriesData] = useState({}); 
  console.log('ssss',categoriesData)


  const getcategoriesProduct = async value => {
    if (categoriesData[value]) {
      setStoreData(categoriesData[value]);
      return;
    }
  
    setProductLoader(true)
    try {
      const response = await fetchCategoryProducts(value);
      if (response?.status) {
        setProductLoader(false);
        console.log(response?.data, value);
        setStoreData(response?.data);



        setCategoriesData(prev => ({
          ...prev,
          [value]: response?.data,
        }));
      } else {
        setProductLoader(false);
      }
    } catch (error) {
      setProductLoader(false);
      console.log(error);
    } finally {
      setProductLoader(false)
    }
  };

  // const getcategoriesProduct = async (value) => {
  //   console.log('hello', value);
  //   setProductLoader(true);
  
  //   try {
  //     const response = await axios.get(`${baseUrl}/getProductsByType/categories/${value}`, {
  //       headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
  //       params: { timestamp: new Date().getTime() }, // Prevent browser cache
  //     });
  
  //     console.log('fareeed', response.data);
  
  //     if (response?.status === 200) {
  //       setStoreData([...response?.data]); // Force React to detect change
  //       setProductLoader(false);
  //     } else {
  //       setProductLoader(false);
  //     }
  //   } catch (error) {
  //     setProductLoader(false);
  //     console.log('API Error:', error);
  //   }
  // };
  
  
  

  // const getcategoriesProduct = async value => {
  //   console.log('Selected Category:', value);
  //   setProductLoader(true);
  
  //   try {
  //     // Force fresh data instead of cache
  //     const response = await cache.get(
  //       `${baseUrl}/getProductsByType/categories/${value}`,
  //       { force: true } // This forces Axios to bypass cache and make a fresh request
  //     );
  
  //     if (response?.status === 200) {
  //       setProductLoader(false);
  //       console.log('Fetched Data:', response?.data);
  //       setStoreData(response?.data);
  //     } else {
  //       setProductLoader(false);
  //     }
  //   } catch (error) {
  //     setProductLoader(false);
  //     console.log('API Error:', error);
  //   } finally {
  //     setProductLoader(false);
  //   }
  // };
  






  const funCategories = val => {
    getcategoriesProduct(val);
    setSelectedCat(val);
  };

  useEffect(() => {
    selected && funCategories(selected);
  }, [selected]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getCatList();
  }, []);


  const renderItem = ({ item, index }) => {
    return (
      <>
        <SingleProductCard
          item={item}
          countList={1 + index}
          isShowPlusIcon={true}
          onPress={() => navigation.navigate('ProductDetails', {
            id: item?.pid,
            selectedCat: selectedCat

          })}
        />
      </>
    );
  };


  // useEffect(() => {
  //   // similarProducts();
  // }, []);

  // const similarProducts = async () => {
  //   setIsLoader(true);
  //   try {
  //     const result = await getSameProduct(text);
  //     if (result?.status) {
  //       setIsLoader(false);
  //       setStoreData(result?.data);
  //     } else {
  //       setIsLoader(false);
  //       alert(response?.message);
  //     }
  //   } catch (error) {
  //     setIsLoader(false);
  //     console.log(error);
  //   }
  // };

  if (isLoader) {
    return <ScreenLoader />;
  }


  return (
    <Animatable.View
      animation={'slideInLeft'}
      duration={1000}
      delay={100}
      style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <HeaderBox
          cartIcon={true}
        />
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={[styles.searchBox]}
            onPress={() => setModalVisible(true)}>

            <ExportSvg.Search
              style={{
                marginLeft: 18,
                marginRight: 10,
              }}
            />
            <Text style={{ color: '#00000080' }}>{t('search_here')}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.arrivalTxt}>{text}</Text>

        <View style={styles.catBox}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={storeCategories}
            renderItem={(item, index) => {
              return (
                <Animatable.View
                  animation={animationMain}
                  duration={durationInner}
                  delay={(1 + index) * delayInner}>
                  <TouchableOpacity
                    onPress={() => funCategories(item.item.name)}
                    key={index}
                    style={[
                      styles.innerCatBox,
                      selectedCat == item.item.name && {
                        backgroundColor: color.theme,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.catTxt,
                        selectedCat == item.item.name && { color: '#fff' },
                      ]}>
                      {item.item.name}
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              );
            }}
          />
        </View>


        {
          productLoader ?
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <CustomLoader bg={false} colors={color.theme} size={'large'} />
            </View>
            :
            <FlatList
              data={storeData}
              // keyExtractor={(item, index) => index?.toString()}
              renderItem={renderItem}
              keyExtractor={(item, index) => selectedCat + "_" + index}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              ListEmptyComponent={<EmptyScreen text={t('no_data_found')} />}
            />
        }

        <SearchModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          navigation={navigation}
        />
      </View>
    </Animatable.View>
  );
};

export default SameProduct;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 40 : 20,
    paddingHorizontal: 15,
    marginBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 15,
    paddingHorizontal: 15,
  },
  arrivalTxt: {
    fontSize: 17,
    fontWeight: '700',
    color: color.theme,
    marginBottom: 10,
  },

  arrivalTitle: {
    fontSize: 15,
    color: color.theme,
    marginTop: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  arrivalSubTitle: {
    color: color.gray,
    marginVertical: 2,
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
  },
  arrivalPrice: {
    color: color.theme,
    fontFamily: 'Montserrat-SemiBold',
  },
  getNowBtn: {
    backgroundColor: color.theme,
    paddingVertical: 6,
    borderRadius: 20,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  getNowBtnTxt: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 11,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },

  searchBox: {
    backgroundColor: color.gray.concat('10'),
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 30,
    // width: '82%',
    width: '100%',
  },
  getNowBtn: {
    backgroundColor: color.theme,
    paddingVertical: 6,
    borderRadius: 20,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  discountTxt: {
    color: color.theme,
    fontWeight: '700',
    fontSize: 22,
  },
  discountTitle: {
    color: color.theme,
    fontWeight: '300',
    fontSize: 20,
  },
  subTitleTxt: {
    color: color.gray,
    fontSize: 12,
    marginTop: 12,
  },
  getNowBtnTxt: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 11,
  },
  arrivalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  arrivalTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: color.theme,
  },
  viewTxt: {
    fontSize: 12,
    fontWeight: '600',
    color: color.gray,
  },
  arrivalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: color.theme,
    marginTop: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  arrivalSubTitle: {
    color: color.gray,
    // fontWeight: "300",
    marginVertical: 2,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  arrivalPrice: {
    color: color.theme,
    // fontWeight: "500",
    fontFamily: 'Montserrat-SemiBold',
  },

  item: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#ccc',
    paddingHorizontal: 20,
  },

  catBox: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  innerCatBox: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 50,
    borderColor: '#ccc',
  },
  catTxt: {
    color: color.theme,
    fontFamily: 'Montserrat-SemiBold',
    // fontWeight: "500"
  },

  imgTitle: {
    color: color.theme,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
  imgSubTitle: {
    color: color.gray,
    fontSize: 13,
    fontWeight: '300',
    marginVertical: 4,
    fontFamily: 'Montserrat-Regular',
  },
  imgPriceTitle: {
    color: color.theme,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
  rightIconNumber: {
    position: 'absolute',
    backgroundColor: '#cecece',
    right: 0,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    right: -5,
  },
  noOfItemTxt: {
    color: '#000',
    fontSize: 10,
  },
});
