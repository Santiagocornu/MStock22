import React, { useState } from 'react';
import { View, TextInput, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useProducts from '../../CustomHooks/UseProduct';

const ItemEdit = ({ item, onClose }) => { // Recibe el item como prop
   const { updateProduct } = useProducts();
   const [image, setImage] = useState(item.image || '');
   const [name, setName] = useState(item.name || '');
   const [price, setPrice] = useState(item.price.toString() || '');

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
     updateProduct({ id: item.id, name, price: parseFloat(price), image }); // Pasa los datos actualizados
     onClose(); // Cierra el modal después de guardar
   };

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
       <Button title="Cerrar" onPress={onClose} />
     </View>
   );
}

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