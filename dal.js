// dal.js

const pool = require('./db')

// Function to retrieve all items from the database
const getAllItems = async() => {
    try {
        const result = await pool.query('SELECT * FROM main_table ORDER BY id'); //
        return result.rows;
    } catch (error) {
        console.error('Error retrieving items from the database:', error);
        throw error;
    }
};

// Function to retrieve a single item by ID from the database
const getItemById = async(itemId) => {
    try {
        const result = await pool.query('SELECT * FROM main_table WHERE id = $1', [itemId]); // 
        return result.rows[0];
    } catch (error) {
        console.error('Error retrieving item from the database:', error);
        throw error;
    }
};

// Function to add a new item to the database
const addItem = async(newItem) => {
    try {
        const result = await pool.query('INSERT INTO main_table (name, description) VALUES ($1, $2) RETURNING *', [newItem.name, newItem.description]);
        return result.rows[0];
    } catch (error) {
        console.error('Error adding item to the database:', error);
        throw error;
    }
};

// Function to update an existing item in the database
const updateItem = async(itemId, updatedItem) => {
    try {
        const result = await pool.query('UPDATE main_table SET name = $1, description = $2 WHERE id = $3 RETURNING *', [updatedItem.name, updatedItem.description, itemId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating item in the database:', error);
        throw error;
    }
};

// Function to delete an item from the database
const deleteItem = async(itemId) => {
    try {
        const result = await pool.query('DELETE FROM main_table WHERE id = $1 RETURNING *', [itemId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting item from the database:', error);
        throw error;
    }
};

module.exports = {
    getAllItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem,
};