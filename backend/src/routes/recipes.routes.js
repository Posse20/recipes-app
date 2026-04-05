import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const recipesRouter = Router();

/**
 * RECIPES ENDPOINTS
 */

// GET ENDPOINTS
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
});

recipesRouter.get('/retrieveById/:id', async (req, res) => {
    try {
        const resourceId = Number(req.params.id);
        const recipe = await prisma.recipe.findUnique({
            where: { id: resourceId },
            include: {
                author: true
            }
        });
        res.json(recipe)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving recipes by id' });
    }

});

// POST ENPOINTS
recipesRouter.post('/create', authMiddleware, async (req, res) => {
    try{
        const { title, process, ingredients } = req.body;
        const recipe = await prisma.recipe.create({
            data: {
                title,
                process,
                authorId: req.userId,
                ingredients: {
                    create: ingredients.map(i => ({
                        name: i.name,
                        quantity: i.quantity
                    }))
                }
            },
            include: {
                ingredients: true
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