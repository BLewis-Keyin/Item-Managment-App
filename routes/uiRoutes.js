const express = require('express');
const pool = require('../db');
const router = express.Router();
const { getAllItems } = require('../dal');

// Define UI routes here

// Example route: Render a page at the root ("/")


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
module.exports = router;