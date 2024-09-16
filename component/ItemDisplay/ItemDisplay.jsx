import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import useProducts from '../../CustomHooks/UseProduct';
import ItemEdit from '../ItemEdit/ItemEdit';

const ProductList = () => {
  const { products, deleteById } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const openEditModal = (item) => {
    setSelectedProduct(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {products.map((item) => (
          <View key={item.id} style={styles.productContainer}>
            {item.image && <Image source={{ uri: item.image }} style={styles.productImage} />}
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Image source={require('../../assets/editIcon.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteById(item.id)}>
                <Image source={require('../../assets/deleteIcon.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      {selectedProduct && (
        <Modal visible={isModalVisible} animationType="slide">
          <ItemEdit item={selectedProduct} onClose={closeModal} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productContainer: {
    width: '48%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    marginVertical: 5,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  icon:{
    height:30,
    width:30,
  }
});

export default ProductList;