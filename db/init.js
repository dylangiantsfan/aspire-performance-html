const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/ecommerce.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT
  )`);

  db.run(`DELETE FROM products`);

  const stmt = db.prepare(`INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)`);
  stmt.run("T-shirt", "Comfortable cotton T-shirt", 19.99, "/images/tshirt.jpg");
  stmt.run("Mug", "Ceramic coffee mug", 9.99, "/images/mug.jpg");
  stmt.run("Sticker Pack", "5-piece sticker pack", 4.99, "/images/stickers.jpg");
  stmt.finalize();

  console.log("Database initialized with sample products.");
});

db.close();
