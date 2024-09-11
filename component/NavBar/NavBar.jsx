import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
    const navigation = useNavigation(); // Get navigation from context

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    const handleStockPress = () => {
        navigation.navigate('ManageStock');
    };

    const handleEnvoicePress = () => {
        navigation.navigate('ManageEnvoice');
    };

    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={handleStockPress} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Productos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleHomePress} style={styles.buttonContainer}>
                <Image 
                    source={require('../../assets/home.png')} 
                    style={styles.imgHome} 
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEnvoicePress} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Pedidos</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        padding: 10,
        textAlign: 'center',
    },
    imgHome: {
        width: 40,
        height: 40,
    },
});

export default NavBar;