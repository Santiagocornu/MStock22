import React from 'react';
import { View, TextInput, Image, Button, StyleSheet } from 'react-native';
import useEditProduct from '../../CustomHooks/UseEditProduct';

const ItemEdit = ({ item,onClose }) => {
  const { name, setName, price, setPrice, image, pickImage, handleSave } = useEditProduct(item);

  return (
    <View style={styles.container}>
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
      <Button title="Guardar" onPress={handleSave} />
      <Button title='Cerrar' onPress={onClose} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
});

export default ItemEdit;