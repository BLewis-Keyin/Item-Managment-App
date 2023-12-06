const express = require('express');
const pool = require('../db');
const router = express.Router();
const { getAllItems } = require('../dal');
const { getItemById } = require('../dal');
const { addItem } = require('../dal');






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
    // Render a form or any UI for adding a new item
    res.render('new');
});

router.post('/items', async(req, res) => {
    const newItem = req.body;

    try {
        const addedItem = await addItem(newItem);
        res.redirect('/items'); // Redirect to the items page after adding a new item
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


module.exports = router;