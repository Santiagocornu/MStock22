import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import EnvoiceDisplay from "../EnvoiceDisplay/EnvoiceDisplay";
import EnvoiceAdd from "../EnvoiceAdd/EnvoiceAdd";
import { useState } from "react";

const ManageEnvoice = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.ManageEnvoice}>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.buttonText}>Añadir Pedido +</Text>
      </TouchableOpacity>
      <EnvoiceDisplay />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <EnvoiceAdd onClose={toggleModal} />
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ManageEnvoice: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  closeButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 10,
  },
});

export default ManageEnvoice;