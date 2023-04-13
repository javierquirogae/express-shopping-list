const express = require('express')
const items = require('../fakeDb')

const router = new express.Router()

router.get('/', (req, res) => {
  console.log(items)
  res.json(items)
})

router.post('/', (req, res) => {
  const newItem = req.body
  items.push(newItem)
  res.status(201).json({ added: newItem })
})

router.get('/:name', (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name)
  if (foundItem) {
    res.json(foundItem)
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})

router.patch('/:name', (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name)
  if (foundItem) {
    Object.assign(foundItem, req.body)
    res.json({ updated: foundItem })
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})

router.delete('/:name', (req, res) => {
  const foundIndex = items.findIndex(item => item.name === req.params.name)
  if (foundIndex !== -1) {
    items.splice(foundIndex, 1)
    res.json({ message: 'Deleted' })
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})

module.exports = router
