import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Abrir la base de datos
        const database = await SQLite.openDatabaseAsync('products.db');
        setDb(database);

        // Crear la tabla si no existe
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT
          );
        `);

        // Obtener los productos
        await getProducts(database); // Llama a getProducts al inicializar
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
      setProducts(result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteById = async (id) => {
    if (db) {
      try {
        // Ejecutar la consulta DELETE
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
        const result = await db.runAsync('INSERT INTO products (name, price, image) VALUES (?, ?, ?)', [name, parseFloat(price), image]);
        console.log('Producto creado con ID:', result.lastInsertRowId);
        
        // Actualiza la lista de productos después de crear uno nuevo
        await getProducts(db);
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    } else {
      console.error('Error al conectarse a la base de datos');
    }
  };

  return { products, db, deleteById, createProduct };
};

export default useProducts;