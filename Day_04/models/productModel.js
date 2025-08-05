const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Product = {
    // Get all products
    getAll: (callback) => {
        const query = 'SELECT * FROM products WHERE is_deleted = 0';
        db.query(query, callback);
    },
    // Get product by ID
    getById: (id, callback) => {
        const query = 'SELECT * FROM products WHERE id = ? AND is_deleted = 0';
        db.query(query, [id], callback);
    },
    // Search products by keyword
    searchByKryword: (keyword, callback) => {
        const searchTerm = `%${keyword}%`;
        const query = 'SELECT * FROM products WHERE name LIKE ? AND is_deleted = 0';
        db.query(query, [searchTerm], callback);
    },
    // Create product
    create: (productData, callback) => {
        const { name, price, discount, review_count, image_url } = productData;
        const query = 'INSERT INTO products (id, name, price, discount, review_count, image_url) VALUES (?, ?, ?, ?, ?, ?)';
        const id = uuidv4(); // Generate a unique ID for the product
        db.query(query, [id, name, price, discount, review_count, image_url], callback);
    },
    // Update product
    update: (id, productData, callback) => {
        const { name, price, discount, review_count, image_url } = productData;
        const query = 'UPDATE products SET name = ?, price = ?, discount = ?, review_count = ?, image_url = ? WHERE id = ?';
        db.query(query, [name, price, discount, review_count, image_url, id], callback);
    },
    // Soft delete product
    softDelete: (id, callback) => {
        const query = 'UPDATE products SET is_deleted = 1 WHERE id = ?';
        db.query(query, [id], callback);
    },
    // Restore product
    restore: (id, callback) => {
        const query = 'UPDATE products SET is_deleted = 0 WHERE id = ?';
        db.query(query, [id], callback);
    },
    // Get all products for view
    getProductsView: (callback) => {
        const query = 'SELECT * FROM products WHERE is_deleted = 0';
        db.query(query, callback);
    }
}

module.exports = Product;
