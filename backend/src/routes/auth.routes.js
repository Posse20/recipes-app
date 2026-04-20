import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

const router = Router();

// REGISTER
router.post('/register', async(req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error creating user'});
    }
});

// LOGIN 
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(!user){
            return res.status(400).json({ error: 'Error, user not found' });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user.id },
            'secret_key',
            { expiresIn: '1d' }
        );

        return res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login error' })
    }
});

export default router;