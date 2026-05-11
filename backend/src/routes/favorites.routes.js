import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const favoritesRouter = express.Router();
const prisma = new PrismaClient();

favoritesRouter.post('/:recipeId', authMiddleware, async(req, res) => {
    try {
        const recipeId = Number(req.params.recipeId);
        const favoriteAlreadyExists = await prisma.favorite.findUnique({
            where: {
                userId_recipeId: {
                    userId: req.userId,
                    recipeId
                }
            }
        });

        if(favoriteAlreadyExists) {
            return;
        }

        const favorite = await prisma.favorite.create({
            data: {
                userId: req.userId,
                recipeId
            }
        });

        res.json(favorite)

    } catch (error) {
        console.error(error);
        res.status(500).json({
        error: 'Error adding favorite'
        });
    }
});

favoritesRouter.delete('/:recipeId', authMiddleware, async(req, res) => {
    try {
        const recipeId = Number(req.params.recipeId);
        await prisma.favorite.deleteMany({
            where: {
                userId = req.userId,
                recipeId
            }
        });
        res.json({ message: 'Fav deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        error: 'Error removing favorite'
        });
    }

});

favoritesRouter.get('/', authMiddleware, async(res, res) => {

    try {
        const favorites = await prisma.favorite.findMany({
            where: {
                userId: req.userId
            },
            include: {
                recipe: {
                    include: {
                        author: true,
                        ingredients: true
                    }
                }
            }
        });
        res.json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error fetching favorites'
        });
    }

})