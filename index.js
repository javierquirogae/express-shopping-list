const express = require('express')
const bodyParser = require('body-parser')
const itemsRouter = require('./routes/items')

const app = express()

app.use(bodyParser.json())
app.use('/items', itemsRouter)

module.exports = app
