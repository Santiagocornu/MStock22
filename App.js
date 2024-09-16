import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from './component/NavBar/NavBar';
import Home from './component/Home/Home';
import ManageStock from './component/ManageStock/ManageStock';
import ManageInvoice from './component/ManageInvoice/ManageInvoice'; // Cambiado de ManageEnvoice a ManageInvoice
import ItemAdd from './component/ItemAdd/ItemAdd';
import ItemEdit from './component/ItemEdit/ItemEdit';
import InvoiceAdd from './component/InvoiceAdd/InvoiceAdd';
import InvoiceEdit from './component/InvoiceEdit/InvoiceEdit';

const Stack = createNativeStackNavigator();

export default function App() {
    const statusBarHeight = StatusBar.currentHeight || 0;

    return (
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
                                name="ManageInvoice" 
                                component={ManageInvoice} 
                            />
                            <Stack.Screen 
                                name="ItemAdd"
                                component={ItemAdd}
                            />
                            <Stack.Screen 
                                name="ItemEdit"
                                component={ItemEdit}
                            />
                            <Stack.Screen
                                name="InvoiceAdd"
                                component={InvoiceAdd}
                            />
                            <Stack.Screen
                                name="InvoiceEdit"
                                component={InvoiceEdit}
                            />
                        </Stack.Navigator>
                        <NavBar />
                    </View>
                </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});