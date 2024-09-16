import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

const UseInvoice = () => {
    const [db, setDb] = useState(null);
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const initializeDatabaseInvoice = async () => {
            try {
                const database = await SQLite.openDatabaseAsync('invoice.db');
                setDb(database);

                await database.execAsync(`
                    CREATE TABLE IF NOT EXISTS invoices (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name_client TEXT NOT NULL,
                        total REAL NOT NULL
                    );
                `);
                await database.execAsync(`
                    CREATE TABLE IF NOT EXISTS invoice_products (
                        invoice_id INTEGER,
                        product_id INTEGER,
                        PRIMARY KEY (invoice_id, product_id),
                        FOREIGN KEY (invoice_id) REFERENCES invoices(id),
                        FOREIGN KEY (product_id) REFERENCES products(id)
                    );
                `);
                await getInvoices(database);
            } catch (e) {
                console.error(e);
            }
        };
        initializeDatabaseInvoice();
    }, []);

    const getInvoices = async (database) => {
        try {
            const result = await database.getAllAsync('SELECT * FROM invoices');
            setInvoices(result);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteById = async (id) => {
        if (db) {
            try {
                await db.runAsync('DELETE FROM invoices WHERE id = ?', [id]);
                console.log('Se ha eliminado la factura con id', id);
                await getInvoices(db);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const createInvoice = async (name_client, total) => {
        if (db) {
            try {
                const result = await db.runAsync('INSERT INTO invoices(name_client, total) VALUES (?, ?)', [name_client, parseFloat(total)]);
                await getInvoices(db);
                return result;
            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('No te pudiste conectar a la base de datos.');
        }
    };

    const updateInvoice = async (updatedItem) => {
        if (db) {
            try {
                await db.runAsync(`
                    UPDATE invoices
                    SET name_client = ?, total = ?
                    WHERE id = ?
                `, [updatedItem.name_client, updatedItem.total, updatedItem.id]);

                console.log('Factura actualizada');
                await getInvoices(db); // Actualiza la lista de facturas después de actualizar
            } catch (error) {
                console.error('Error al actualizar la factura:', error);
            }
        } else {
            console.error('La base de datos no está inicializada.');
        }
    };

    const addProductToInvoice = async (invoiceId, productId) => {
        if (db) {
            try {
                await db.runAsync('INSERT INTO invoice_products (invoice_id, product_id) VALUES (?, ?)', [invoiceId, productId]);
                console.log(`Producto con ID ${productId} agregado a la factura con ID ${invoiceId}.`);
            } catch (error) {
                console.error('Error al agregar producto a la factura:', error);
            }
        } else {
            console.error('La base de datos no está inicializada.');
        }
    };

    const removeProductFromInvoice = async (invoiceId, productId) => {
        if (db) {
            try {
                await db.runAsync('DELETE FROM invoice_products WHERE invoice_id = ? AND product_id = ?', [invoiceId, productId]);
                console.log(`Producto con ID ${productId} eliminado de la factura con ID ${invoiceId}.`);
            } catch (error) {
                console.error('Error al eliminar producto de la factura:', error);
            }
        } else {
            console.error('La base de datos no está inicializada.');
        }
    };

    const getProductsForInvoice = async (invoiceId) => {
      if (db) {
          try {
              const result = await db.getAllAsync(`
                  SELECT p.*
                  FROM invoice_products ip
                  JOIN products p ON ip.product_id = p.id
                  WHERE ip.invoice_id = ?
              `, [invoiceId]);
              return result;
          } catch (error) {
              console.error('Error fetching products for invoice:', error);
          }
      } else {
          console.error('La base de datos no está inicializada.');
      }
  };
    return { invoices, db, deleteById, createInvoice, updateInvoice, addProductToInvoice, removeProductFromInvoice, getProductsForInvoice };
};

export default UseInvoice;