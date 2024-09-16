import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import useProducts from './UseProduct'; // Asegúrate de que esta ruta sea correcta

const useEditProduct = (item) => {
  const { db } = useProducts(); // Obtener la base de datos del contexto
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

  const handleSave = async () => {
    const updatedItem = { id: item.id, name, price, image };

    // Actualizar el producto en la base de datos
    if (db) {
      try {
        await db.runAsync(`
          UPDATE products
          SET name = ?, price = ?, image = ?
          WHERE id = ?
        `, [updatedItem.name, updatedItem.price, updatedItem.image, updatedItem.id]);
        console.log('Producto actualizado');
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
      }
    }
  };

  return {
    name,
    setName,
    price,
    setPrice,
    image,
    pickImage,
    handleSave,
  };
};

export default useEditProduct;