import React, { useState } from 'react';
import { View, TextInput, Image, Button, StyleSheet, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProducts } from '../../Context/ProductContext';

const ItemEdit = ({ item, onClose }) => {
    const { updateProduct } = useProducts();
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [image, setImage] = useState(item.image);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        const updatedItem = { id: item.id, name, price, image };
        updateProduct(updatedItem);
        onClose();
    };

    return (
        <Modal visible={true} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Button title="Seleccionar imagen" onPress={pickImage} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Precio"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
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
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
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

export default ItemEdit;