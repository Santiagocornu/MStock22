import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import ItemDisplay from "../ItemDisplay/ItemDisplay";
import ItemAdd from "../ItemAdd/ItemAdd";

const ManageStock = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.manageStock}>
            <TouchableOpacity style={styles.buttonAddProduct} onPress={toggleModal}>
                <Text style={styles.buttonText}>Añadir Producto +</Text>
            </TouchableOpacity>
            <View style={styles.productsContainer}>
                <Text style={styles.productsTitle}>Productos</Text>
                <ItemDisplay />
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ItemAdd onClose={toggleModal} />
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
});

export default ManageStock;