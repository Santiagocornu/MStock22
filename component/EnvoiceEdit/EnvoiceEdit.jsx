import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { useEnvoice } from '../../Context/EnvoiceContext';

const EnvoiceEdit = ({ envoice, onClose }) => {
    const { updateEnvoice } = useEnvoice();
    const [name, setName] = useState(envoice.products.map(product => product.name).join(", "));
    const [total, setTotal] = useState(envoice.total);

    const handleSave = () => {
        const updatedEnvoice = { ...envoice, products: name.split(", ").map(name => ({ name })), total };
        updateEnvoice(updatedEnvoice);
        onClose();
    };

    return (
        <Modal visible={true} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Productos (separados por comas)"
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Guardar" onPress={handleSave} />
                        <Button title="Cancelar" onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
});

export default EnvoiceEdit;