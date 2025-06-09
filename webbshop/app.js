const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const app = express()
const port = 4000

const db = new sqlite3.Database('database.db')
db.run("PRAGMA foreign_keys = ON;")

app.use(express.static('public'))
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'pug')

const createTable = 
`
CREATE TABLE vehicle(
    id INTEGER PRIMARY KEY,
    price INTEGER,
    model TEXT,
    cc INTEGER,
    img TEXT
)
`

const insertVehicle =
`
INSERT INTO vehicle(price, model, cc, img)
VALUES(?,?,?,?)
`

const getVehicles = `
SELECT * FROM vehicle
`

db.all(insertVehicle, [355000, "Custom Road Glide", 2000, "Road-Glide-boasts-Screamin-Eagle-Stage-.webp"], (err,row) => {
    if(err){
        console.log(err)
    }
})


app.get('/', (req, res) => {
    res.render('index', {})
})

app.get('/fordon', (req, res) => {
    db.all(getVehicles, (err,row)=> {
        console.log(row)
        res.render('fordon', {"vehicles" : row})
    })
})

app.get('/index', (req, res) => {
    res.render('index', {})
})

app.get('/om', (req, res) => {
    res.render('om', {})
})

app.get('/kontakt', (req, res) => {
    res.render('kontakt', {})
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})