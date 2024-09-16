import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import useProducts from '../../CustomHooks/UseProduct';
import UseInvoice from '../../CustomHooks/UseInvoice'; // Cambiado a UseInvoice

const InvoiceAdd = () => { // Cambiado a InvoiceAdd
    const { products } = useProducts();
    const { createInvoice, addProductToInvoice } = UseInvoice(); // Cambiado a UseInvoice
    const [orderName, setOrderName] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductSelect = (product) => {
        setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
    }; 

    const handleRemoveProduct = (product) => {
        setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((item) => item.id !== product.id));
    };

    const handleSubmit = async () => { 
        if (!orderName || selectedProducts.length === 0) { 
            alert('Por favor, ingresa un nombre de pedido y selecciona al menos un producto.'); 
            return; 
        }

        const total = selectedProducts.reduce((sum, product) => sum + (parseFloat(product.price) || 0), 0);

        // Crear la nueva factura
        const newOrder = { 
           name_client: orderName,
           total,
       };

       // Crear la nueva factura primero y obtener su ID
       const result = await createInvoice(newOrder.name_client, newOrder.total); 

       // Agregar productos a la nueva factura
       for (const product of selectedProducts) { 
           await addProductToInvoice(result.lastInsertRowId, product.id); 
       }

       setOrderName('');
       setSelectedProducts([]);
   };

   return (
       <View style={styles.container}>
           <Text style={styles.title}>Agregar Pedido</Text>
           <TextInput
               style={styles.input}
               placeholder="Nombre del pedido"
               value={orderName}
               onChangeText={setOrderName}
           />
           <Text style={styles.subtitle}>Seleccionar Productos</Text>
           <FlatList
               data={products}
               keyExtractor={(item) => item.id.toString()}
               renderItem={({ item }) => (
                   <View style={styles.productItem}>
                       <Text>{item.name} - ${item.price}</Text>
                       {selectedProducts.some((product) => product.id === item.id) ? (
                           <Button title="Quitar" onPress={() => handleRemoveProduct(item)} color="red" />
                       ) : (
                           <Button title="Agregar" onPress={() => handleProductSelect(item)} />
                       )}
                   </View>
               )}
           />
           <Button title="Guardar Pedido" onPress={handleSubmit} />
       </View>
   );
};

const styles = StyleSheet.create({
   container: { 
       flex: 1,
       padding: 20,
       backgroundColor: '#fff',
   },
   title: { 
       fontSize: 24,
       marginBottom: 20,
   },
   subtitle: { 
       fontSize: 18,
       marginVertical: 10,
   },
   input: { 
       height: 40,
       borderColor: '#ccc',
       borderWidth: 1,
       borderRadius: 5,
       paddingHorizontal: 10,
       marginBottom: 10,
   },
   productItem: { 
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       marginVertical: 5,
   },
});

export default InvoiceAdd; 