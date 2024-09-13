import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useEnvoice } from "../../Context/EnvoiceContext";
import EnvoiceEdit from "../EnvoiceEdit/EnvoiceEdit"; // Asegúrate de que la ruta es correcta

const EnvoiceDisplay = () => {
    const { envoice, removeEnvoice } = useEnvoice();
    const [editingEnvoice, setEditingEnvoice] = useState(null);

    const handleEdit = (envoice) => {
        setEditingEnvoice(envoice);
    };

    const calculateTotal = (products) => {
        return products.reduce((sum, product) => {
            return sum + (product.price || 0);
        }, 0);
    };

    const renderEnvoiceItem = ({ item }) => {
        const total = calculateTotal(item.products);

        return (
            <View style={styles.envoiceItem}>
                <Text style={styles.envoiceOrderName}>Nombre del pedido: {item.name}</Text>
                <Text style={styles.envoiceName}>Pedido: {item.products.map(product => product.name).join(", ")}</Text>
                <Text style={styles.envoiceTotal}>Total: ${total}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Editar" onPress={() => handleEdit(item)} />
                    <Button title="Eliminar" onPress={() => removeEnvoice(item.id)} color="red" />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pedidos</Text>
            <FlatList
                data={envoice}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderEnvoiceItem}
            />
            {editingEnvoice && (
                <EnvoiceEdit envoice={editingEnvoice} onClose={() => setEditingEnvoice(null)} />
            )}
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
    envoiceItem: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    envoiceOrderName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    envoiceName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    envoiceTotal: {
        fontSize: 16,
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default EnvoiceDisplay;