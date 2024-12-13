const request = require('supertest');
const express = require('express');
const router = require('../../routes/index.js');
const UserModel = require('../../database/models/user.model.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(router);

describe('user', () => {
    it('POST 200 Create user', async() => {
        await request(app)
            .post('/api/user/add')
            .send({ email: 'test@example.com', password: 'password123', name:"John Doe" })
            .expect(200);
        
            const userFound = await UserModel.findOne({ email: 'test@example.com' });
            expect(userFound.name).toBe('John Doe');
    })

    it('POST 400 Create user already exists', async() => {
        await UserModel.create({email: 'test@example.com', password: await bcrypt.hash('test', 8)});
        const res = await request(app)
            .post('/api/user/add')
            .send({ email: 'test@example.com', password: 'password123', name:"John Doe" })
            .expect(400);
        
        expect(res.body).toEqual('Un compte avec cet email exist déjà!');
    })

    // À corriger dans le code code TODO
    // it('POST 400 Create user with a password with 4 char', async() => {

    //     const res = await request(app)
    //         .post('/api/user/add')
    //         .send({ email: 'test@example.com', password: '1234', name:"John Doe" })
    //         .expect(400);
        
    //         expect(res.body).toEqual('Le mot de passe fait moins de 8 caractères');
    // })

    it('GET 200 Get currrent user', async() => {
        await UserModel.create({email: 'test@example.com', password: await bcrypt.hash('test', 8)});

        const userFound = await UserModel.findOne({ email: 'test@example.com' });

        if (!userFound) {
            throw new Error('User not found');
        }
        const token = await jwt.sign({}, require('../../env/keys/index.js'), {
            subject: userFound._id.toString(),
            expiresIn: 60 * 60 * 24 * 30 * 6,
            algorithm: 'RS256',
        })
        const res = await request(app).get('/api/user').set('Cookie', `token=${token}`).expect(200);

        expect(res.body).toEqual({ email: 'test@example.com' });
    })

    it('GET 404 User does not exist', async() => {
        const token = jwt.sign({}, require('../../env/keys/index.js'), {
            subject: "675bef360b8f6e9966770a3d",
            expiresIn: 60 * 60 * 24 * 30 * 6,
            algorithm: 'RS256',
        })

        const res  = await request(app).get('/api/user').set('Cookie', `token=${token}`).expect(404);
        expect(res.body).toBeNull();
    })

    it('DELETE 200 delete user', async() => {
        await UserModel.create({email: 'test@example.com', password: await bcrypt.hash('test', 8)});

        const userFound = await UserModel.findOne({ email: 'test@example.com' });

        if (!userFound) {
            throw new Error('User not found');
        }
        const token = jwt.sign({}, require('../../env/keys/index.js'), {
            subject: userFound._id.toString(),
            expiresIn: 60 * 60 * 24 * 30 * 6,
            algorithm: 'RS256',
        })
        await request(app).delete('/api/user/delete').set('Cookie', `token=${token}`).expect(200);

        const userNotExist = await UserModel.findOne({ email: 'test@example.com' });
        expect(userNotExist).toBeNull();
    })
})