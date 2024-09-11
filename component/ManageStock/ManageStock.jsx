import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ItemDisplay from "../ItemDisplay/ItemDisplay";
import { useNavigation } from '@react-navigation/native';

const ManageStock = () => {
    const navigation = useNavigation(); // Obtener navegación del contexto

    const handleItemAddPress = () => {
        navigation.navigate('ItemAdd');
    };

    return (
        <View style={styles.manageStock}>
            <TouchableOpacity style={styles.buttonAddProduct} onPress={handleItemAddPress}>
                <Text style={styles.buttonText}>Añadir Producto +</Text>
            </TouchableOpacity>
            <View style={styles.productsContainer}>
                <Text style={styles.productsTitle}>Productos</Text>
                <ItemDisplay />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    manageStock: {
        flex: 1,
        justifyContent: 'flex-start', // Cambiado a 'flex-start' para que el botón esté en la parte superior
        backgroundColor: '#fff', // Color de fondo
    },
    buttonAddProduct: {
        backgroundColor: 'green',
        padding: 16,
        marginBottom: 20, // Espacio entre el botón y la lista
    },
    buttonText: {
        color: '#fff', // Color del texto del botón
        fontSize: 16, // Tamaño del texto
        textAlign: 'center', // Centrar el texto
    },
    productsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    productsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
});

export default ManageStock;