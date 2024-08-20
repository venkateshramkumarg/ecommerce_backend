import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client'; // Import the 'Product' type
import * as bcrypt from 'bcrypt';
const orderGroup = new Hono();
const prisma = new PrismaClient();


// POST /api/orders: Create a new order.

interface createOrder{
    email:string;
    password:string;
    product_ids:number[];
}
orderGroup.post('/create/order', async (c) => {
    const {email,password,product_ids}:createOrder =  await c.req.json();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const products=await prisma.product.findMany({
                where:{
                    productid:{
                        in:product_ids
                    }
                }
            })
            const totalAmount:number= products.reduce((acc: number, product) => acc + product.price, 0);

            const order = await prisma.order.create({
                data: {
                    userId: user.userid,
                    totalAmount
                },
                products:{
                    connect:product_ids.map((id:number)=>({
                        productid:id
                    }))
                }
            });
            return c.json(order);
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

// GET /api/orders: Get all orders (admin only).
orderGroup.get('/', async (c) => {
    const {email,password} =  await c.req.json();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password)&&user.role==='admin')
        {
            const orders = await prisma.order.findMany();
            return c.json(orders);
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

// GET /api/orders/:id: Get a single order by ID only user and admin can access.
orderGroup.get('/:id', async (c) => {
    const {email,password} =  await c.req.json();
    const {id} =  c.req.param();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const order = await prisma.order.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            return c.json(order);
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

// PUT /api/orders/:id: Update an order status (admin only).
orderGroup.put('/:id', async (c) => {
    const {email,password,status} =  await c.req.json();
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
            const order = await prisma.order.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    status
                }
            });
            return c.json(order);
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

// DELETE /api/orders/:id: Cancel an order.
orderGroup.delete('/:id', async (c) => {
    const {email,password} =  await c.req.json();
    const {id} =  c.req.param();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const order = await prisma.order.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return c.json(order);
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

export default orderGroup
