const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./fcmobile.db');

db.serialize(() => {
  // Drop the old table so we can start fresh with more players
  db.run(`DROP TABLE IF EXISTS players`);

  // Create the table
  db.run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    base_ovr INTEGER,
    position TEXT,
    club TEXT
  )`);

  // Insert a wider variety of players for testing
  const stmt = db.prepare("INSERT INTO players (name, base_ovr, position, club) VALUES (?, ?, ?, ?)");
  
  // Strikers / Wingers
  stmt.run("Kylian Mbappé", 91, "ST", "Real Madrid");
  stmt.run("Erling Haaland", 91, "ST", "Man City");
  stmt.run("Vinicius Jr", 90, "LW", "Real Madrid");
  stmt.run("Mohamed Salah", 89, "RW", "Liverpool");
  
  // Midfielders
  stmt.run("Jude Bellingham", 90, "CM", "Real Madrid");
  stmt.run("Kevin De Bruyne", 89, "CAM", "Man City");
  stmt.run("Rodri", 89, "CM", "Man City");
  
  // Defenders
  stmt.run("Virgil van Dijk", 88, "CB", "Liverpool");
  stmt.run("Rúben Dias", 88, "CB", "Man City");
  stmt.run("Theo Hernández", 85, "LB", "AC Milan");
  stmt.run("Dani Carvajal", 84, "RB", "Real Madrid");
  
  // Goalkeeper
  stmt.run("Alisson Becker", 88, "GK", "Liverpool");

  stmt.finalize();
});

module.exports = db;