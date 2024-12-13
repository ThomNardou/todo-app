const request = require('supertest');
const express = require('express');
const router = require('../../routes/index.js');
const UserModel = require('../../database/models/user.model.js');

const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(router);

describe('Authentication', () => {
    const createUser = async () => await UserModel.create({email: 'test@example.com', password: await bcrypt.hash('test', 8)});

    it('POST 400 User does not exist', async() => {
        // Act
        const response = await request(app)
            .post('/api/auth')
            .send({ email: 'test@example.com', password: 'password123' });

        // Assert
        expect(response.body).toEqual('Utilisateur non trouvé');
        expect(response.statusCode).toBe(400);
    })
    it('POST 200 Connect with valid credentials', async() => {
        // Arrange
        await createUser();

        // Act
        const response = await request(app)
            .post('/api/auth')
            .send({ email: 'test@example.com', password: 'test' });

        // Assert
        expect(response.body).toEqual({email: 'test@example.com'});
        expect(response.statusCode).toBe(200);
    })
    it('POST 400 Connect with not valid credentials', async() => {
        // Arrange
        await createUser();

        // Act
        const response = await request(app)
            .post('/api/auth')
            .send({ email: 'test@example.com', password: 'noGoodPassword' });

        // Assert
        expect(response.body).toEqual('Mauvais email ou mot de passe!');
        expect(response.statusCode).toBe(400);
    })
})