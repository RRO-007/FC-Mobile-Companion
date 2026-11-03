const express = require('express');
const cors = require('cors');
const db = require('./database');
const path = require('path'); // Added this!
const app = express();

app.use(cors());
app.use(express.json());

// THIS is the magic line that shows your index.html
app.use(express.static(__dirname)); 

// The Official FC Mobile OVR Formula
function calculateTeamOVR(baseOvrArray, rankArray, badgeBonus) {
    const baseAvg = baseOvrArray.reduce((a, b) => a + b, 0) / baseOvrArray.length;
    const rankAvg = rankArray.reduce((a, b) => a + b, 0) / rankArray.length;
    return Math.ceil(baseAvg) + Math.ceil(rankAvg) + (badgeBonus || 0);
}

// API endpoint to calculate
app.post('/api/calculate', (req, res) => {
    const { bases, ranks, badges } = req.body;
    if (bases.length !== ranks.length) {
        return res.status(400).json({ error: "Mismatch in player count" });
    }
    const ovr = calculateTeamOVR(bases, ranks, badges);
    res.json({ teamOvr: ovr });
});

// API endpoint to get players from database
app.get('/api/players', (req, res) => {
    db.all("SELECT * FROM players", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});