import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma.js'

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

/**
 * USER ENDPOINTS
 */

app.post('/users', async(req, res) => {
    const user = await prisma.user.create({
        data: {
            email: 'test@test.com',
            password: '1234'
        }
    });

    res.json(user);
});

/**
 * RECIPES ENDPOINTS
 */

app.post('/recipes', async (req, res) => {
    try{
        const { title, authorId } = req.body;
        const recipe = await prisma.recipe.create({
            data: {
                title,
                authorId
            }
        });

        res.json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating recipe'});
    }
});

app.listen(3000, () => {
  console.log('Server on http://localhost:3000');
});