import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const recipesRouter = Router();

/**
 * RECIPES ENDPOINTS
 */

recipesRouter.get('/retrieve', async (req, res) => {
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

recipesRouter.post('/create', authMiddleware, async (req, res) => {
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

recipesRouter.post('/delete', authMiddleware, async (req, res) => {
    try {
        const { recipeId } = req.body;
        await prisma.recipe.delete({
            where: {
                id: recipeId
            }
        });
        res.json({ message: 'Recipe deleted successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting recipe' });
    }
})

export default recipesRouter;