import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [db, setDb] = useState(null);

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                const database = await SQLite.openDatabaseAsync('products.db');
                setDb(database);

                await database.execAsync(`
                    CREATE TABLE IF NOT EXISTS products (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        price REAL NOT NULL,
                        image TEXT
                    );
                `);

                await getProducts(database); // Cargar productos al inicializar
            } catch (error) {
                console.error('Error initializing database:', error);
            }
        };
        initializeDatabase();
    }, []);

    // Función para obtener productos
    const getProducts = async (database) => {
        try {
            const result = await database.getAllAsync('SELECT * FROM products');
            setProducts(result); // Actualiza el estado con los productos obtenidos
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteById = async (id) => {
        if (db) {
            try {
                await db.runAsync('DELETE FROM products WHERE id = ?', [id]);
                console.log(`Producto con ID ${id} eliminado.`);
                await getProducts(db); // Actualiza la lista de productos después de eliminar
            } catch (e) {
                console.error('Error al eliminar el producto:', e);
            }
        } else {
            console.error('La base de datos no está inicializada.');
        }
    };

    const createProduct = async (name, price, image) => {
        if (db) {
            try {
                await db.runAsync('INSERT INTO products (name, price, image) VALUES (?, ?, ?)', [name, parseFloat(price), image]);
                console.log('Producto creado.');

                // Actualiza la lista de productos después de crear uno nuevo
                await getProducts(db);
            } catch (error) {
                console.error('Error al crear el producto:', error);
            }
        } else {
            console.error('Error al conectarse a la base de datos');
        }
    };

    const updateProduct = async (updatedItem) => {
        if (db) {
            try {
                await db.runAsync(`
                    UPDATE products
                    SET name = ?, price = ?, image = ?
                    WHERE id = ?
                `, [updatedItem.name, updatedItem.price, updatedItem.image, updatedItem.id]);

                console.log('Producto actualizado');
                await getProducts(db); // Actualiza la lista de productos después de actualizar
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
            }
        } else {
            console.error('La base de datos no está inicializada.');
        }
    };

    return { products, db, deleteById, createProduct, updateProduct };
};

export default useProducts;