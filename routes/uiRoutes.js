const express = require('express');
const pool = require('../db');
const router = express.Router();
const { getAllItems } = require('../dal');
const { getItemById } = require('../dal');
const { addItem } = require('../dal');
const { updateItem } = require('../dal');
const { deleteItem } = require('../dal');






router.get('/', async(req, res) => {
    try {
        let result = await getAllItems();
        let items = result;
        res.render('index', { items }); // Pass 'items' to the template
    } catch (error) {
        console.error('Error retrieving items from the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/items', async(req, res) => {
    try {
        let result = await getAllItems();
        let items = result;
        res.render('items', { items });
    } catch (error) {
        console.error('Error retrieving items from the database:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/items/new', (req, res) => {
    res.render('new');
});

router.post('/items', async(req, res) => {
    const newItem = req.body;

    try {
        const addedItem = await addItem(newItem);
        res.redirect('/'); // Redirect
    } catch (error) {
        console.error('Error adding item to the database:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/items/:id', async(req, res) => {
    const itemId = parseInt(req.params.id, 10);
    try {
        const item = await getItemById(itemId);
        if (!item) {
            return res.status(404).render('not-found');

        }
        res.render('details', { item });
    } catch (error) {
        console.error('Error retrieving item details from the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/items/:id/edit', async(req, res) => {
    const itemId = parseInt(req.params.id, 10);
    try {
        const item = await getItemById(itemId);
        if (!item) {
            return res.status(404).render('not-found');
        }
        res.render('edit', { item });
    } catch (error) {
        console.error('Error retrieving item details for edit:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/items/:id', async(req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const updatedItem = req.body;

    try {
        const result = await updateItem(itemId, updatedItem);
        if (!result) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.redirect(`/items/${itemId}`);
    } catch (error) {
        console.error('Error updating item in the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/items/:id/edit', async(req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const updatedFields = req.body;
    try {
        const result = await updateItem(itemId, updatedFields);
        if (!result) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.redirect(`/`); // Redirect 
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/items/:id', async(req, res) => {
    const itemId = parseInt(req.params.id, 10);
    try {
        const result = await deleteItem(itemId);
        if (!result) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.redirect(`/`); // Redirect 
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;