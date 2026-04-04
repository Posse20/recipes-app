import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma.js'
import authRoutes from './routes/auth.routes.js'
import recipesRouter from './routes/recipes.routes.js';

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

/**
 * RECIPES ENDPOINTS
 */

app.use('/recipes', recipesRouter);

app.listen(3000, () => {
  console.log('Server on http://localhost:3000');
});