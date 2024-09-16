import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import UseInvoice from "../../CustomHooks/UseInvoice";
import InvoiceEdit from '../InvoiceEdit/InvoiceEdit';

const InvoiceDisplay = () => { 
  const { invoices, deleteById } = UseInvoice(); 
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    setSelectedInvoice(null);
  };

  const openEditModal = (item) => {
    setSelectedInvoice(item); 
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {invoices && invoices.length > 0 ? (
          invoices.map((item) => (
            <View key={item.id} style={styles.invoiceContainer}>
              <Text style={styles.invoiceName}>{item.name_client}</Text>
              <Text style={styles.invoiceTotal}>${item.total}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => openEditModal(item)}>
                  <Image source={require('../../assets/editIcon.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteById(item.id)}>
                  <Image source={require('../../assets/deleteIcon.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>No invoices available</Text>
        )}
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
        {selectedInvoice && (
          <InvoiceEdit invoice={selectedInvoice} onClose={closeModal} />
        )}
      </Modal>
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
  invoiceContainer: { 
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
  invoiceName: { 
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  invoiceTotal: { 
    fontSize: 14,
    marginVertical: 5,
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
  },

  productList: {
      width: '100%',
      marginVertical: 5,
   },
   productItem: {
      fontSize: 14,
   }
});

export default InvoiceDisplay;