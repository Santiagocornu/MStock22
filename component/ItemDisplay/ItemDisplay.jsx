import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import { useProducts } from '../../Context/ProductContext'; // Asegúrate de que la ruta sea correcta
import { TouchableOpacity } from "react-native";

const ItemDisplay = () => {
    const { products } = useProducts(); // Obtener la lista de productos del contexto

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            {item.image && (
                <Image source={{ uri: item.image }} style={styles.productImage} />
            )}
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <View style={styles.iconsDisplay}>
                <TouchableOpacity style={styles.iconButton}>
                    <Image source={require('../../assets/deleteIcon.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Image source={require('../../assets/editIcon.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.ItemDisplay}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                numColumns={2} // Mantener el número de columnas constante
                key={`${products.length}`} // Cambia la clave para forzar un nuevo renderizado si cambia la longitud de los productos
            />
        </View>
    );
};

const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla

const styles = StyleSheet.create({
    ItemDisplay: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
        backgroundColor: '#fff', // O el color que prefieras
    },
    productContainer: {
        width: (width / 2) - 15, // Ajustar el ancho al 50% menos el margen
        padding: 10,
        alignItems: 'center',
        borderWidth: 1, // Ancho del borde
        borderColor: '#000', // Color del borde
        borderRadius: 10, // Radio de los bordes redondeados
        margin: 5, // Espacio entre cada carta
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productPrice:{
        fontSize: 16,
        fontWeight: 'light',
    },
    iconsDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 20
    },
    icon: {
        height: 30,
        width: 30,
    },
});

export default ItemDisplay;