import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma.js'
import authRoutes from './routes/auth.routes.js'
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

/**
 * USER ENDPOINTS
 */

app.use('/auth', authRoutes);

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

app.get('/recipes', async (req, res) => {
    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                author: true
            }
        });
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving recipes' });
    }
})

app.post('/recipes', authMiddleware, async (req, res) => {
    try{
        const { title, authorId } = req.body;
        const recipe = await prisma.recipe.create({
            data: {
                title,
                authorId: req.userId
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