import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import { useProducts } from '../../Context/ProductContext';
import { useEnvoice } from '../../Context/EnvoiceContext';

const EnvoiceAdd = () => {
    const { products } = useProducts();
    const { addEnvoice } = useEnvoice();
    const [orderName, setOrderName] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductSelect = (product) => {
        setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
    };

    const handleRemoveProduct = (product) => {
        setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((item) => item.id !== product.id));
    };

    const handleSubmit = () => {
        if (!orderName || selectedProducts.length === 0) {
            // Validación: Nombre del pedido y al menos un producto seleccionado
            alert('Por favor, ingresa un nombre de pedido y selecciona al menos un producto.');
            return;
        }

        const newOrder = {
            id: Date.now(),
            name: orderName,
            products: selectedProducts,
            total: selectedProducts.reduce((sum, product) => {
                // Asegúrate de convertir el precio a número antes de sumarlo
                return sum + (parseFloat(product.price) || 0);
            }, 0),
        };

        addEnvoice(newOrder);
        setOrderName('');
        setSelectedProducts([]);
        // Aquí puedes navegar a otra pantalla o realizar cualquier otra acción después de agregar el pedido
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Pedido</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del pedido"
                value={orderName}
                onChangeText={setOrderName}
            />
            <Text style={styles.subtitle}>Seleccionar Productos</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text>{item.name} - ${item.price}</Text>
                        {selectedProducts.some((product) => product.id === item.id) ? (
                            <Button title="Quitar" onPress={() => handleRemoveProduct(item)} color="red" />
                        ) : (
                            <Button title="Agregar" onPress={() => handleProductSelect(item)} />
                        )}
                    </View>
                )}
            />
            <Button title="Guardar Pedido" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default EnvoiceAdd;