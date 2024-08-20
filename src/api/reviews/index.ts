import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const reviewGroup = new Hono();
const prisma = new PrismaClient();

// Review
// POST /api/reviews: Submit a review for a product.
// GET /api/reviews/:productId: Get all reviews for a product.
// PUT /api/reviews/:id: Update a review.
// DELETE /api/reviews/:id: Delete a review.

reviewGroup.post('/', async (c) => {
    const {email,password,productid,rating,comment} =  await c.req.json();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const review = await prisma.review.create({
                data: {
                    userid: user.userid,
                    productid,
                    rating,
                    comment
                }
            });
            return c.json(review);
        }
        else
        {
            return c.json({error: 'Invalid email or password'});
        }
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

reviewGroup.get('/:id', async (c) => {
    const {id} =  c.req.param();
    const productid = parseInt(id);
    try
    {
        const reviews = await prisma.review.findMany({
            where: {
                productid
            }
        });
        return c.json(reviews);
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

reviewGroup.put('/:id', async (c) => {
    const {email,password,rating,comment} =  await c.req.json();
    const {id}= c.req.param();
    const reviewid = parseInt(id);
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const review = await prisma.review.update({
                where: {
                    reviewid
                },
                data: {
                    rating,
                    comment
                }
            });
            return c.json(review);
        }
        else
        {
            return c.json({error: 'Invalid email or password'});
        }
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

reviewGroup.delete('/:id', async (c) => {
    const {email,password} =  await c.req.json();
    const {id}= c.req.param();
    const reviewid = parseInt(id);
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const review = await prisma.review.delete({
                where: {
                    reviewid
                }
            });
            return c.json(review);
        }
        else
        {
            return c.json({error: 'Invalid email or password'});
        }
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

export default reviewGroup;