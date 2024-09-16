import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useProducts from '../../CustomHooks/UseProduct';

const ItemAdd = ({ onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const { createProduct} = useProducts();

  useEffect(() => {
    
    const imgPermiss = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Lo sentimos, necesitamos permisos para acceder a la galería de imágenes.');
      }
    };
    imgPermiss();
  }, []);

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

  const handleCreateProduct = () => {
    if (!name || !price || !image) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    
    createProduct(name, price, image);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Selecciona una imagen" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <Button title="Crear Producto" onPress={handleCreateProduct} />
      <Button title='Cerrar' onPress={onClose} style={styles.closeButton}/> 
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: 'red',
  },
});

export default ItemAdd;