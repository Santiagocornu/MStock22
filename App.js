import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from './component/NavBar/NavBar';
import Home from './component/Home/Home';
import ManageStock from './component/ManageStock/ManageStock';
import ManageEnvoice from './component/ManageEnvoice/ManageEnvoice';
import ItemAdd from './component/ItemAdd/ItemAdd';
import { ProductProvider } from './Context/ProductContext';

const Stack = createNativeStackNavigator();

export default function App() {
    const statusBarHeight = StatusBar.currentHeight || 0;

    return (
        <ProductProvider>
        <NavigationContainer>
            <View style={[styles.container, { marginTop: statusBarHeight }]}>
            
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen 
                        name="Home" 
                        component={Home} 
                    />
                    <Stack.Screen 
                        name="ManageStock" 
                        component={ManageStock} 
                    />
                    <Stack.Screen 
                        name="ManageEnvoice" 
                        component={ManageEnvoice} 
                    />
                    <Stack.Screen 
                        name="ItemAdd"
                        component={ItemAdd}
                    />
                </Stack.Navigator>
                
                <NavBar />
            </View>
        </NavigationContainer>
        </ProductProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});