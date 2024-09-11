import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const addProduct = (product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
    };

    const removeProduct = (productId) => {
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductContext);
};