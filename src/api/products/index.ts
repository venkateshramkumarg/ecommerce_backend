import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const productGroup = new Hono();
const prisma = new PrismaClient();

//GET /api/products/allproducts: Get all products. 
productGroup.get('/allproducts', async (c) => {
    try
    {
        const products = await prisma.product.findMany();
        return c.json(products);
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

// GET /api/products/:id: Get a single product by ID.
productGroup.get('/uniqueproduct/:id', async (c) => {
    const {id} =  c.req.param();
    try
    {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return c.json(product);
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

// POST /api/products: Add a new product (admin only). 
// check the email id and password of the user and check the role
productGroup.post('/addproduct', async (c) => {
    const {email,password,name,price,description} =  await c.req.json();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password)&&user.role==='admin')
        {
            const product = await prisma.product.create({
                data: {
                    name,
                    price,
                    description
                }
            });
            return c.json(product);
        }
        else
        {
            return c.json({error: 'Invalid email or password or you are not admin'});
        }
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

// PUT /api/products/:id: Update a product by ID (admin only).
productGroup.put('/updateproduct/:id', async (c) => {
    const {email,password,name,price,description} =  await c.req.json();
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
            const product = await prisma.product.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name,
                    price,
                    description
                }
            });
            return c.json(product);
        }
        else
        {
            return c.json({error: 'Invalid email or password or you are not admin'});
        }
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

// DELETE /api/products/:id: Delete a product by ID (admin only).
productGroup.delete('/deleteproduct/:id', async (c) => {
    const {email,password} =  await c.req.json();
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
            const product = await prisma.product.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return c.json(product);
        }
        else
        {
            return c.json({error: 'Invalid email or password or you are not admin'});
        }
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

export default productGroup;