const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware to serve static files and parse JSON
app.use(express.static('public'));
app.use(express.json());

// Setup SQLite database
let db = new sqlite3.Database(':memory:');

// Create and populate the products table
db.serialize(() => {
    db.run('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL)');
    const stmt = db.prepare('INSERT INTO products (name, price) VALUES (?, ?)');
    stmt.run('GYNO 7 125 ML', 36.61);
    stmt.run('CICATRISEPT SP 100ML', 29.75);
    stmt.run('CICATRISEPT CREME', 45.5);
    stmt.run('CICATRISEPT POUDRE', 22.75);
    stmt.run('MYOFLEX Crème 35 ml', 41.3);
    stmt.run('MYOFLEX Tubedoseur', 60.2);
    stmt.run('OROSEPT SPRAY', 38.5);
    stmt.run('VITALIFE EFF 20CP', 48.3);
    stmt.run('VITALIFE EFF 10CP', 26.25);
    stmt.run('FORTMAG EFFE', 60.2);
    stmt.run('FER LIFE 20 GELL', 55.86);
    stmt.run('FER LIFE 30 GELL', 60.2);
    stmt.run('PIWI GELL', 48.3);
    stmt.run('PIWI SIROP 125m', 52.43);
    stmt.run('MALDORANE SIROP', 55.86); // Corrected decimal point
    stmt.run('TONIVEN CREME', 40.74);
    stmt.run('VERUSOL 15ML', 40.6); // Corrected decimal point
    stmt.run('SPECTRA SPRAY', 44.80);
    stmt.run('SPECTRA VERNIS', 84.0); // Ensured it's a float
    stmt.run('FORTMAG 30 GELL', 57.75);
    stmt.run('CARBONYL30 GELL', 52.15);
    stmt.run('CARBOXIDINE BB 150ML', 25.55); // Corrected decimal point
    stmt.run('CARBOXIDINE SPRAY 60ML', 26.25); // Corrected decimal point
    stmt.run('SPECTRA MAG 30 GELULE', 57.4); // Corrected decimal point
    stmt.run('SPECTRA VIT 30 GELULE', 45.5); // Corrected decimal point
    stmt.run('SPECTRA GEL 150ML', 46,55);
    // Add more products as needed
    stmt.finalize();
});

// API endpoint to fetch products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
