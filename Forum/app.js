const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const sql = require("./sql")
const app = express()
const port = 4000
 
const db = new sqlite3.Database('database.db')
db.run("PRAGMA foreign_keys = ON;")

function getPreciseTime(){
  let yourDate = new Date()
  const offset = yourDate.getTimezoneOffset()
  yourDate = new Date(yourDate.getTime() - (offset*60*1000))
  let yourDateList = yourDate.toISOString().split('T')
  return `${yourDateList[0]} ${yourDateList[1].split('.')[0]}`
}
/*
db.serialize(() => {
  db.all(sql.createPostSQL(), [1,1 ,getPreciseTime,"", "Ninja H2R or Ducati V4R" ], (err, row) => {
    if (err) {
      console.error(err.message);
    }
  });
});
*/
 
app.use(express.static('public'))
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'pug')
 
app.get('/', (req, res) => {
  db.serialize(() => {
    db.all(sql.getCategorySQL(), (err, row) => {
      if (err) {
        console.error(err.message);
      }
 
      console.log(row)
  
      res.render('index', {"categoryList" : row})
    });
  });
})

app.get('/category/:id', (req, res) => {
  console.log(req.params)
  db.serialize(() => {
    db.all(sql.getThreadByCategory(), [req.params.id], (err, row) => {
      if (err) {
        console.error(err.message);
      }
 
      console.log(row)
  
      res.render('category', {"threadList" : row})
    });
  });
})
 
app.get('/users', (req, res) => {
  db.serialize(() => {
    db.all(sql.getUserSQL(), (err, row) => {
      if (err) {
        console.error(err.message);
      }
 
      console.log(row)
  
      res.render('users', {"userList" : row})
    });
  });
})



app.get('/thread/:id', (req, res) => {
  console.log(req.params)
  db.serialize(() => {
    db.all(sql.getPostByThread(), [req.params.id], (err, row) => {
      if (err) {
        console.error(err.message);
      }
 
      console.log(row)
  
      res.render('thread', {"postList" : row})
    });
  });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})