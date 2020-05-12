const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const movieRouter = require('./db/models/routes/movie-router')
const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send(' Worlds!')
})


app.use('/api', movieRouter)

const a_func = (req) => {
  console.log('func call')
  req.params.screen = req.params.screen +1

}

app.get('/tickets/:screen', function (req, res) {
  res.send(req.params)
  a_func(req)
  res.send(req.params)
  })


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
