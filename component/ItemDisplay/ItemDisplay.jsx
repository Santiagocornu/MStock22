import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite';
import ItemEdit from "../ItemEdit/ItemEdit";

const db = SQLite.openDatabase('MStock.db'); // Nombre de la base de datos

const ItemDisplay = () => {
    const [products, setProducts] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    const fetchProducts = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Items',
                [],
                (tx, results) => {
                    const items = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        items.push(results.rows.item(i));
                    }
                    setProducts(items);
                },
                (tx, error) => {
                    console.error('Error al cargar productos', error);
                }
            );
        });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            {item.image && (
                <Image source={{ uri: item.image }} style={styles.productImage} />
            )}
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <View style={styles.iconsDisplay}>
                <TouchableOpacity style={styles.iconButton} onPress={() => removeProduct(item.id)}>
                    <Image source={require('../../assets/deleteIcon.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setEditingItem(item)}>
                    <Image source={require('../../assets/editIcon.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const removeProduct = (id) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Items WHERE id = ?',
                [id],
                () => {
                    fetchProducts();
                },
                (tx, error) => {
                    console.error('Error al eliminar producto', error);
                }
            );
        });
    };

    const handleCloseEdit = () => {
        setEditingItem(null);
        fetchProducts();
    };

    return (
        <View style={styles.ItemDisplay}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                numColumns={2}
                key={`${products.length}`}
                showsVerticalScrollIndicator={false}
            />
            {editingItem && (
                <ItemEdit item={editingItem} onClose={handleCloseEdit} />
            )}
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    ItemDisplay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    productContainer: {
        width: (width / 2) - 15,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        margin: 5,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'light',
    },
    iconsDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 20,
    },
    icon: {
        height: 30,
        width: 30,
    },
});

export default ItemDisplay;