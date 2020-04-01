import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import RestaurantsScreen from '../screens/Restaurants';
import TopRestaurantsScreen from '../screens/TopRestaurants';
import MyAccountScreen from '../screens/Account/MyAccount';
import SearchScreen from '../screens/Search';
import LoginScreen from '../screens/Account/Login';
import RegisterScreen from '../screens/Account/Register';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Restaurantes' component={RestaurantsScreen}/>
            <Stack.Screen name='Restaurante' component={RestaurantsScreen}/>
        </Stack.Navigator>
    )
}

function TopRestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Top 5' component={TopRestaurantsScreen}/>
        </Stack.Navigator>
    )
}

function SearchRestaurantStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Buscar' component={SearchScreen}/>
        </Stack.Navigator>
    )
}

function MyAccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Mi Cuenta' component={MyAccountScreen}/>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Registro' component={RegisterScreen}/>
        </Stack.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Cuenta'>
                <Tab.Screen
                    name='Restaurantes'
                    component={RestaurantsStack}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name='compass-outline' color={color} size={size} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Ranking'
                    component={TopRestaurantsStack}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name='star-outline' color={color} size={size} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Buscar'
                    component={SearchRestaurantStack}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name='magnify' color={color} size={size} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Cuenta'
                    component={MyAccountStack}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name='account' color={color} size={size} />
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
