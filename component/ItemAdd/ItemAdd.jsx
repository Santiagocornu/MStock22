import React, { useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'react-native-sqlite-storage';



const ItemAdd = ({ onClose }) => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(''); // Inicializar price como cadena vacía
  const [image, setImage] = React.useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Lo sentimos, necesitamos permisos para acceder a la galería de imágenes.');
      }
    })();
  }, []);

  const createObject = () => {
    if (name.trim() !== '' && price.trim() !== '' && image) { // Verificar que price no esté vacío
      const newObject = { name, price: parseFloat(price), image }; // Convertir price a número
      addProductToDatabase(newObject);
      console.log("Nuevo objeto creado:", newObject);
      setName('');
      setPrice(''); // Restablecer price a cadena vacía
      setImage(null);
      onClose();
    } else {
      Alert.alert('Por favor, completa todos los campos y selecciona una imagen.');
    }
  };

  const addProductToDatabase = (product) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Items (name, price, image) VALUES (?, ?, ?)',
        [product.name, product.price, product.image],
        () => {
          Alert.alert('Producto agregado exitosamente');
        },
        (tx, error) => {
          console.error('Error al agregar producto', error);
          Alert.alert('Error al agregar producto');
        }
      );
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Imagen seleccionada:", result.assets[0].uri);
      setImage(result.assets[0].uri);
    } else {
      console.log("Selección de imagen cancelada");
    }
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
      <Button title="Crear Producto" onPress={createObject} />
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