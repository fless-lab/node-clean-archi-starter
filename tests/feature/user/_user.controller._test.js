const request = require('supertest');
const app = require('../../../src/frameworks/webserver/express');
const UserService = require('../../../src/features/user/user.service');

jest.mock('../../../src/features/user/user.service'); 

describe('UserController Tests', () => {
    let userServiceMock;

    beforeEach(() => {
        userServiceMock = new UserService();
        app.userService = userServiceMock;  
    });

    test('GET /api/users should return all users', async () => {
        const usersMock = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
            { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' }
        ];
        userServiceMock.getAllUsers.mockResolvedValue(usersMock);

        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(usersMock);
    });

    test('GET /api/users/:id should return a user', async () => {
        const userMock = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
        userServiceMock.getUserById.mockResolvedValue(userMock);

        const response = await request(app).get('/api/users/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(userMock);
    });

    test('POST /api/users should create a new user', async () => {
        const newUser = { firstName: 'Alice', lastName: 'Wonderland', email: 'alice@example.com', password: 'password123' };
        const expectedUser = { ...newUser, id: 3 };
        userServiceMock.createUser.mockResolvedValue(expectedUser);

        const response = await request(app).post('/api/users').send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(expectedUser);
    });

    test('PUT /api/users/:id should update an existing user', async () => {
        const updates = { firstName: 'Alice', lastName: 'Wonderland' };
        const updatedUser = { id: 1, firstName: 'Alice', lastName: 'Wonderland', email: 'john.doe@example.com' };
        userServiceMock.updateUser.mockResolvedValue(updatedUser);

        const response = await request(app).put('/api/users/1').send(updates);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(updatedUser);
    });

    test('DELETE /api/users/:id should delete a user', async () => {
        userServiceMock.deleteUser.mockResolvedValue(1);

        const response = await request(app).delete('/api/users/1');
        expect(response.statusCode).toBe(204);
        expect(response.text).toEqual('');
    });
});
