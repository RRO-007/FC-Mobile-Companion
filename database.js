const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./fcmobile.db');

db.serialize(() => {
  // Create the table
  db.run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    base_ovr INTEGER,
    position TEXT,
    club TEXT
  )`);

  // Insert sample data (Only run once)
  const stmt = db.prepare("INSERT INTO players (name, base_ovr, position, club) VALUES (?, ?, ?, ?)");
  stmt.run("Kylian Mbappé", 91, "ST", "Real Madrid");
  stmt.run("Jude Bellingham", 90, "CM", "Real Madrid");
  stmt.run("Erling Haaland", 91, "ST", "Man City");
  stmt.finalize();
});

module.exports = db;