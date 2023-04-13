process.env.NODE_ENV = "test";

const request = require('supertest')
const app = require('../index')
const items = require('../fakeDb')

describe('Items API', () => {
  beforeEach(() => {
    items.length = 0 // Clear the fakeDb before each test
  })

  describe('GET /items', () => {
    test('should return an empty array if no items', async () => {
      const response = await request(app).get('/items')
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })

    test('should return an array of items', async () => {
      items.push({ name: 'item1', price: 1.23 })
      items.push({ name: 'item2', price: 4.56 })
      const response = await request(app).get('/items')
      expect(response.status).toBe(200)
      expect(response.body).toEqual(items)
    })
  })

  describe('POST /items', () => {
    test('should add a new item', async () => {
      const newItem = { name: 'item1', price: 1.23 }
      const response = await request(app).post('/items').send(newItem)
      expect(response.status).toBe(201)
      expect(response.body).toEqual({ added: newItem })
      expect(items).toHaveLength(1)
      expect(items[0]).toEqual(newItem)
    })
  })

  describe('GET /items/:name', () => {
    test('should return an item by name', async () => {
      const item = { name: 'item1', price: 1.23 }
      items.push(item)
      const response = await request(app).get(`/items/${item.name}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual(item)
    })

    test('should return 404 if item not found', async () => {
      const response = await request(app).get('/items/nonexistent')
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Item not found' })
    })
  })

  describe('PATCH /items/:name', () => {
    test('should update an item by name', async () => {
      const item = { name: 'item1', price: 1.23 }
      items.push(item)
      const updatedItem = { name: 'new item', price: 4.56 }
      const response = await request(app).patch(`/items/${item.name}`).send(updatedItem)
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ updated: updatedItem })
      expect(items).toHaveLength(1)
      expect(items[0]).toEqual(updatedItem)
    })

    test('should return 404 if item not found', async () => {
      const response = await request(app).patch('/items/nonexistent').send({ price: 1.23 })
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Item not found' })
    })
  })

  describe('DELETE /items/:name', () => {
    test('should delete an item by name', async () => {
      const item = { name: 'item1', price: 1.23 }
      items.push(item)
      const response = await request(app).delete(`/items/${item.name}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Deleted' })
      expect(items).toHaveLength(0)
    })

    test('should return 404 if item not found', async () => {
        const response = await request(app).delete('/items/nonexistent')
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'Item not found' })
        })
    })
})

// Path: index.js
// Compare this snippet from app.js:
// const express = require('express')
// const bodyParser = require('body-parser')
// const itemsRouter = require('./routes/items')
//
