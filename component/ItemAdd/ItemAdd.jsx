import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ItemAdd = () => {
  const [objects, setObjects] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Lo sentimos, necesitamos permisos para acceder a la galería de imágenes.');
      }
    })();
  }, []);

  // Debugging useEffect to check image state
  useEffect(() => {
    console.log("Current image URI:", image);
  }, [image]);

  const createObject = () => {
    if (name.trim() !== '' && price.trim() !== '' && image) {
      const newObject = { id: objects.length + 1, name, price, image };
      console.log("Nuevo objeto creado:", newObject);
      setObjects([...objects, newObject]);
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
      console.log("Imagen seleccionada:", result.assets[0].uri); // Use the correct path to the URI
      setImage(result.assets[0].uri); // Update to use the correct URI
    } else {
      console.log("Selección de imagen cancelada");
    }
  };

  return (
    <View>
      <Button title="Selecciona una imagen" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Crear Producto" onPress={createObject} />
      {objects.map((obj) => (
        <View key={obj.id} style={{ marginVertical: 10 }}>
          <Text>{obj.name}</Text>
          <Text>{obj.price}</Text>
          {obj.image && (
            <Image source={{ uri: obj.image }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
          )}
        </View>
      ))}
    </View>
  );
};

export default ItemAdd;