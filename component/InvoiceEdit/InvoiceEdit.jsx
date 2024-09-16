import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native';
import UseInvoice from '../../CustomHooks/UseInvoice';
import useProducts from '../../CustomHooks/UseProduct';

const InvoiceEdit = ({ invoice, onClose }) => {
    const { updateInvoice } = UseInvoice();
    const { products } = useProducts();
    const [clientName, setClientName] = useState(invoice.name_client);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [total, setTotal] = useState(invoice.total);

    useEffect(() => {
        // Calculate total based on selected products
        const calculateTotal = () => {
            const totalAmount = selectedProducts.reduce((sum, product) => sum + product.price, 0);
            setTotal(totalAmount);
        };

        calculateTotal();
    }, [selectedProducts]);

    const toggleProductSelection = (product) => {
        if (selectedProducts.some(selected => selected.id === product.id)) {
            // Remove product if already selected
            setSelectedProducts(selectedProducts.filter(selected => selected.id !== product.id));
        } else {
            // Add product if not selected
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    const handleSave = async () => {
        await updateInvoice({ ...invoice, name_client: clientName, total });
        onClose(); // Close modal after saving
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={clientName}
                onChangeText={setClientName}
                placeholder="Client Name"
            />
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Text>{item.name} - ${item.price.toFixed(2)}</Text>
                        <Button
                            title={selectedProducts.some(selected => selected.id === item.id) ? "Remove" : "Add"}
                            onPress={() => toggleProductSelection(item)}
                        />
                    </View>
                )}
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default InvoiceEdit;