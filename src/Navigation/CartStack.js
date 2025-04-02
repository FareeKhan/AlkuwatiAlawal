import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../screens/userScreens/UserProfile';
import MyCart from '../screens/userScreens/MyCart';
import ExportSvg from '../constants/ExportSvg';
import AllProducts from '../screens/userScreens/AllProducts';
import MyFavorite from '../screens/userScreens/MyFavorite';
import CategoriesList from '../screens/userScreens/CategoriesList';
import ShippingAddress from '../screens/userScreens/ShippingAddress';
import OrderDetails from '../screens/userScreens/OrderDetails';
import PaymentOrder from '../screens/userScreens/PaymentOrder';
import TrackOrder from '../screens/userScreens/TrackOrder';
import { createStackNavigator } from '@react-navigation/stack';
import SameProduct from '../screens/userScreens/SameProduct';
import ProductDetails from '../screens/userScreens/ProductDetails';
import UserDetails from '../screens/userScreens/UserDetails';


const Stack = createStackNavigator();
export const CartStack = () => {
    return (
        <Stack.Navigator

            initialRouteName="MyCart"
            screenOptions={{
                headerTitleAlign: 'center',
                headerShown: false
            }}
        >
            <Stack.Screen name="CategoriesList" component={CategoriesList} />
            <Stack.Screen name="ShippingAddress" component={ShippingAddress} options={{
                presentation: "modal",
                gestureEnabled: true,
            }} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="PaymentOrder" component={PaymentOrder} />
            <Stack.Screen
                name="AllProducts"
                component={AllProducts}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{ headerShown: false }}
            />


            <Stack.Screen
                name="SameProduct"
                component={SameProduct}
            />
            <Stack.Screen
                name="MyCart"
                component={MyCart}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="TrackOrder" component={TrackOrder} />
            <Stack.Screen name="MyFavorite" component={MyFavorite} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
        </Stack.Navigator>
    )
}


