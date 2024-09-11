import React, { useEffect } from 'react';
import { View, Text, Button, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProducts } from '../../Context/ProductContext';

const ItemAdd = () => {
  const { addProduct } = useProducts(); // Obtener la función addProduct del contexto
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
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
    if (name.trim() !== '' && price.trim() !== '' && image) {
      const newObject = { id: Date.now(), name, price, image }; // Usar Date.now() para generar un ID único
      addProduct(newObject); // Usar la función addProduct del contexto
      console.log("Nuevo objeto creado:", newObject);
      setName('');
      setPrice('');
      setImage(null);
    } else {
      Alert.alert('Por favor, completa todos los campos y selecciona una imagen.');
    }
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
    </View>
  );
};

export default ItemAdd;