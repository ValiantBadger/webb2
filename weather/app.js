const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.get('/gron', (req, res) => {
    res.render('article', { title: 'Grön', message: 'Hello there! gröning' })
})

app.get('/rod', (req, res) => {
    res.render('article', { title: 'Röd', message: 'Hello there! röding' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

