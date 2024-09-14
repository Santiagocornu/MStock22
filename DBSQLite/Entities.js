import * as SQLite from 'react-native-sqlite-storage'

const createTables = () => {
    db.transaction(tx => {
        // Crear tabla Items
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                image TEXT
            )`
        );

        // Crear tabla Envoice
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Envoice (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                total REAL NOT NULL
            )`
        );

        // Crear tabla Stock
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Stock (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                quantity INTEGER NOT NULL
            )`
        );
    });
};

// Llamar a la función para crear las tablas
createTables();