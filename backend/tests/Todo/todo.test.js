const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../../database/models/user.model.js');
const todoRouter = require('../../routes/todo.api.js');
const bcrypt = require('bcrypt');
const TodoModel = require('../../database/models/todo.model.js');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/', todoRouter);

describe('Test for the todos', () => {
    const createUser = async () => await await UserModel.create({email: 'test@example.com', password: await bcrypt.hash('test', 8)});
    it('Test to Get TODO from user', async () => {
        // Arrange
        await createUser();
        const userFound = await UserModel.findOne({ email: 'test@example.com' });

        if (!userFound) {
            throw new Error('User not found');
        }

        const token = jwt.sign({}, require('../../env/keys/index.js'), {
            subject: userFound._id.toString(),
            expiresIn: 60 * 60 * 24 * 30 * 6,
            algorithm: 'RS256',
        })

        await TodoModel.create({text: 'test', completed: false, user_id: userFound._id.toString()});

        // Act
        const response = await request(app).get('/').set('Cookie', `token=${token}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body[0].text).toBe('test');
        expect(response.body[0].completed).toBe(false);
        expect(response.body[0].user_id).toEqual(userFound._id.toString());
        
    })

    it('Test to Post TODO from user', async () => {
        // Arrange
        await createUser();

        const userFound = await UserModel.findOne({ email: 'test@example.com' });

        if (!userFound) {
            throw new Error('User not found');
        }

        const token = jwt.sign({}, require('../../env/keys/index.js'), {
            subject: userFound._id.toString(),
            expiresIn: 60 * 60 * 24 * 30 * 6,
            algorithm: 'RS256',
        })
        // Act
        const response = await request(app).post('/add').send({text: 'test', completed: false}).set('Cookie', `token=${token}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toBeNull();

    })

    it('Test to delete TODO from user', async () => {
        // Arrange
        await createUser();

        const userFound = await UserModel.findOne({ email: 'test@example.com' });

        if (!userFound) {
            throw new Error('User not found');
        }
        const todo = await TodoModel.create({text: 'test', completed: false, user_id: userFound._id.toString()});

        // Act
        const response = await request(app).post(`/${todo._id.toString()}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toBeNull();
    })
})