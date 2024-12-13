const request = require('supertest');
const expresponses = require('express');
const router = require('../../routes/index.js');
const UserModel = require('../../database/models/user.model.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = expresponses();
app.use(cookieParser());
app.use(expresponses.json());
app.use(router);

describe('user', () => {
    const createUser = async () => await UserModel.create({email: 'test@example.com', password: await bcrypt.hash('test', 8)});
    const createToken = async () => {
        const userFound = await UserModel.findOne({ email: 'test@example.com' });
        if (!userFound) {
            throw new Error('User not found');
        }

        return await jwt.sign({}, require('../../env/keys/index.js'), {
            subject: userFound._id.toString(),
            expiresIn: 60 * 60 * 24 * 30 * 6,
            algorithm: 'RS256',
        })
    }


    it('POST 200 Create user', async() => {
        // Act
        const response = await request(app)
            .post('/api/user/add')
            .send({ email: 'test@example.com', password: 'password123', name:"John Doe" })
        
        const userFound = await UserModel.findOne({ email: 'test@example.com' });

        // Assert
        expect(userFound.name).toBe('John Doe');
        expect(response.statusCode).toBe(200);
    })

    it('POST 400 Create user already exists', async() => {
        // Arrange
        await createUser();

        // Act
        const response = await request(app)
            .post('/api/user/add')
            .send({ email: 'test@example.com', password: 'password123', name:"John Doe" })

        // Assert
        expect(response.body).toEqual('Un compte avec cet email exist déjà!');
        expect(response.statusCode).toBe(400);
    })

    // À corriger dans le code code TODO
    // it('POST 400 Create user with a password with 4 char', async() => {

    //     const response = await request(app)
    //         .post('/api/user/add')
    //         .send({ email: 'test@example.com', password: '1234', name:"John Doe" });

    //         expect(response.body).toEqual('Le mot de passe fait moins de 8 caractèresponse');
    //         expect(response.statusCode).toBe(400);
    // })

    it('GET 200 Get currrent user', async() => {
        // Arrange
        await createUser();
        const token = await createToken();

        // Act
        const response = await request(app).get('/api/user').set('Cookie', `token=${token}`);

        // Assert
        expect(response.body).toEqual({ email: 'test@example.com' });
        expect(response.statusCode).toBe(200);
    })

    it('GET 404 User does not exist', async() => {
        // Arrange
        const token = jwt.sign({}, require('../../env/keys/index.js'), {
            subject: "675bef360b8f6e9966770a3d",
            expiresIn: 60 * 60 * 24 * 30 * 6,
            algorithm: 'RS256',
        })
        // Act
        const response  = await request(app).get('/api/user').set('Cookie', `token=${token}`).expect(404);

        // Assert
        expect(response.body).toBeNull();
        expect(response.statusCode).toBe(404);
    })

    it('DELETE 200 delete user', async() => {
        // Arrange
        await createUser();
        const token = await createToken();

        // Act
        const response = await request(app).delete('/api/user/delete').set('Cookie', `token=${token}`);

        const userNotExist = await UserModel.findOne({ email: 'test@example.com' });

        // Assert
        expect(userNotExist).toBeNull();
        expect(response.statusCode).toBe(200);
    })
})