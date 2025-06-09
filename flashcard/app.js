const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const sql = require("./sql")
const app = express()
const port = 3000

 

const db = new sqlite3.Database('database.db')
db.run("PRAGMA foreign_keys = ON;")

app.use(express.static('public'))
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'pug')

/*
db.serialize(() => {
  db.all(sql.insertCard(), [2, "Kina","Zhōngguó"], (err, row) => {
    if (err) {
      console.error(err.message);
    }
  });
});
*/

app.get('/', async (req, res) => {
  db.serialize(() => {
    db.all(sql.getCollections(), (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row)
      res.render('index', {"collections" : row})
    });
  });
})

app.get('/collection/:id', async (req, res) => {
  console.log(req.params.id)
  db.serialize(() => {
    db.all(sql.getCardsByCollection(), [req.params.id],(err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row)
      res.render('collection', {"cards" : row})
    });
  });
})

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})