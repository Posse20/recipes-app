import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const userProfileRouter = Router();

userProfileRouter.get('/profile', authMiddleware, async(req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
            }
        });
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error fetching profile'
        });
    }
});

userProfileRouter.put('/edit', authMiddleware, async(req, res) => {
    try {
        const {email, firstName, lastName} = req.body;

        const updateUser = await prisma.user.update({
            where: { id: req.userId },
            data: {
                email,
                firstName,
                lastName
            }
        });

        res.json(updateUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user'});
    }
})

export default userProfileRouter;