// tests/item-api-tests.js

const request = require('supertest');
const app = require('../index'); // Replace with the actual path to your Express app

describe('Item API Endpoints', () => {
    let itemId;

    it('should create a new item', async() => {
        const res = await request(app)
            .post('/api/items')
            .send({
                name: 'Test Item',
                description: 'This is a test item.',
            });
        expect(res.statusCode).toEqual(200);
        itemId = res.body.id;
    });

    it('should retrieve all items', async() => {
        const res = await request(app).get('/api/items');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should retrieve a specific item by ID', async() => {
        const res = await request(app).get(`/api/items/${itemId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Test Item');
    });

    it('should update an existing item', async() => {
        const res = await request(app)
            .put(`/api/items/${itemId}`)
            .send({
                name: 'Updated Test Item',
                description: 'This is the updated test item.',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Updated Test Item');
    });

    it('should delete an item', async() => {
        const res = await request(app).delete(`/api/items/${itemId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(itemId);
    });
});