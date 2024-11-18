const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');


const app = express();
const port = 3001;


// Middleware
app.use(express.json()); // Use express.json() for parsing JSON bodies
app.use(cors());


// Set up SQLite database
const path = require('path');
const dbPath = path.join(__dirname, 'database', 'games.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        db.run(`CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            game_title TEXT,
            developer TEXT,
            release_date TEXT,
            rating INTEGER,
            notes TEXT
        )`);
    }
});


// Get a single game by ID
app.get('/api/games/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM games WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else if (!row) {
            res.status(404).send('Game not found');
        } else {
            res.status(200).json(row);
        }
    });
});


// Add a new game
app.post('/api/games', (req, res) => {
    const { game_title, developer, release_date, rating, notes } = req.body;
    db.run(`INSERT INTO games (game_title, developer, release_date, rating, notes) VALUES (?, ?, ?, ?, ?)`,
        [game_title, developer, release_date, rating, notes],
        function (err) {
            if (err) {
                res.status(500).send('Error inserting data');
            } else {
                res.status(201).json({ id: this.lastID });
            }
        });
});


// Get all games
app.get('/api/games', (req, res) => {
    db.all('SELECT * FROM games', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(rows);
        }
    });
});

app.post('/add-to-watchlist', (req, res) => {
    const { title } = req.body;
    db.run('INSERT INTO games (title) VALUES (?)', [title], function (err) {
      if (err) {
        console.error(err.message);
        res.json({ success: false });
      } else {
        db.run('INSERT INTO watchlist (id) VALUES (?)', [this.lastID], (err) => {
          if (err) {
            console.error(err.message);
            res.json({ success: false });
          } else {
            res.json({ success: true });
          }
        });
      }
    });
  });
  
  app.get('/get-watchlist', (req, res) => {
    db.all(
      `SELECT watchlist.id, games.game_title
       FROM watchlist
       JOIN games ON watchlist.id = games.id`,
      [],
      (err, rows) => {
        if (err) {
          console.error(err.message);
          res.json({ success: false });
        } else {
          res.json({ success: true, watchlist: rows });
        }
      }
    );
  });
  
  app.post('/remove-from-watchlist', (req, res) => {
    const { id } = req.body;
    db.run('DELETE FROM watchlist WHERE id = ?', [id], (err) => {
      if (err) {
        console.error(err.message);
        res.json({ success: false });
      } else {
        res.json({ success: true });
      }
    });
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
