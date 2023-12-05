// tests/ui-tests.js

const request = require('supertest');
const app = require('../index'); // Replace with the actual path to your Express app

describe('UI Endpoints', () => {
    it('should render the item list page', async() => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Item List');
    });

    it('should render the item details page', async() => {
        const res = await request(app).get(`/items/${itemId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Item Details');
    });

    it('should render the add new item page', async() => {
        const res = await request(app).get('/items/new');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Add New Item');
    });

    it('should render the edit item page', async() => {
        const res = await request(app).get(`/items/${itemId}/edit`);
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Edit Item');
    });
});