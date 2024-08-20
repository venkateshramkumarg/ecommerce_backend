import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const categoryGroup = new Hono();
const prisma = new PrismaClient();


//GET /api/categories/allcategories: Get all categories.
categoryGroup.get('/allcategories', async (c) => {
    try
    {
        const categories = await prisma.category.findMany();
        return c.json(categories);
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})


categoryGroup.get('/uniquecategory/:id', async (c) => {
    const {id} =  c.req.param();
    try
    {
        const category = await prisma.category.findUnique({
            where: {
                categoryid: parseInt(id)
            }
        });
        return c.json(category);
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

categoryGroup.post('/add/category', async (c) => {
    const {email,password,name,description} =  await c.req.json();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password)&&user.role==='admin')
        {
            const category = await prisma.category.create({
                data: {
                    name,
                    description
                }
            });
            return c.json(category);
        }
        else
        {
            return c.json({error: 'Invalid email or password or you are not an admin'});
        }
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

categoryGroup.put('/update/category/:id', async (c) => {
    const {email,password,name,description} =  await c.req.json();
    const {id} =  c.req.param();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password)&&user.role==='admin')
        {
            const category = await prisma.category.update({
                where: {
                    categoryid: parseInt(id)
                },
                data: {
                    name,
                    description
                }
            });
            return c.json(category);
        }
        else
        {
            return c.json({error: 'Invalid email or password or you are not an admin'});
        }
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

// DELETE /api/categories/delete/category/:id: Delete a category (admin only).
interface categoryDelete {
    email: string;
    password: string;
}
categoryGroup.delete('/delete/category/:id', async (c) => {
    const {email,password}:categoryDelete =  await c.req.json();
    const {id} =  c.req.param();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password)&&user.role==='admin')
        {
            const category = await prisma.category.delete({
                where: {
                    categoryid: parseInt(id)
                }
            });
            return c.json(category);
        }
        else
        {
            return c.json({error: 'Invalid email or password or you are not an admin'});
        }
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

export default categoryGroup;