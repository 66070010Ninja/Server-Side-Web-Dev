const app = require('express')();
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const port = process.env.PORT || 3000;

app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            return res.status(500).send('Database query failed');
        } else {
            res.json(results);
        }
    });
});

app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Database query failed');
        }
        if (results.length === 0) {
            return res.status(404).send('Product not found');
        }
        res.json(results[0]);
    });
});

app.get('/products/search/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    db.query('SELECT * FROM products WHERE name LIKE ?', [`%${keyword}%`], (err, results) => {
        if (err) {
            return res.status(500).send('Database query failed');
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});