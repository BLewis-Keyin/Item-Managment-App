const express = require('express');
const router = express.Router();
const dal = require('../dal');

// GET all items
router.get('/items', async(req, res) => {
    try {
        const items = await dal.getAllItems();
        res.json(items);
    } catch (error) {
        console.error('Error in API route:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET a single item by ID
router.get('/items/:id', async(req, res) => {
    const itemId = parseInt(req.params.id, 10);
    try {
        const item = await dal.getItemById(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        console.error('Error in API route:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST a new item
router.post('/items', async(req, res) => {
    const newItem = req.body;
    try {
        const addedItem = await dal.addItem(newItem);
        res.json(addedItem);
    } catch (error) {
        console.error('Error in API route:', error);
        res.status(500).send('Internal Server Error');
    }
});

// PUT (update) an item
router.put('/items/:id', async(req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    try {
        const result = await dal.updateItem(itemId, updatedItem);
        if (!result) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error in API route:', error);
        res.status(500).send('Internal Server Error');
    }
});

// PATCH (partial update) an item
router.patch('/items/:id', async(req, res) => {
    const itemId = req.params.id;
    const updatedFields = req.body;
    try {
        const result = await dal.updateItem(itemId, updatedFields);
        if (!result) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error in API route:', error);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE an item
router.delete('/items/:id', async(req, res) => {
    const itemId = req.params.id;
    try {
        const result = await dal.deleteItem(itemId);
        if (!result) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error in API route:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;