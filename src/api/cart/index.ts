import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client'; // Import the 'Product' type
import * as bcrypt from 'bcrypt';
const cartGroup = new Hono();
const prisma = new PrismaClient();

// Cart
// GET /api/cart: Get the user's cart.
// POST /api/cart: Add a product to the cart.
// PUT /api/cart: Update the quantity of a product in the cart.
// DELETE /api/cart/:productId: Remove a product from the cart.

interface cartdelete{
    email:string,
    password:string,
}
interface getcart{
    email:string,
    password:string
}
interface cartadd{
    email:string,
    password:string,
    productid:number,
    quantity:number
}
interface cartupdate{
    email:string,
    password:string,
    productid:number,
    quantity:number
}

// GET /api/cart/getcart: Get the user's cart.
cartGroup.get('/getcart', async (c) => {
    const {email,password}:getcart =  await c.req.json();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const cart = await prisma.cart.findUnique({
                where: {
                    userid: user.userid
                },
                include:{
                    products:true
                }
            });
            return c.json(cart);
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


// POST /api/cart/cartadd Add a product to the cart.
cartGroup.post('/cartadd', async (c) => {
    const {email,password,productid,quantity}:cartadd =  await c.req.json();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const cart = await prisma.cart.findUnique({
                where: {
                    userid: user.userid
                }
            });
            if(cart)
            {
                const product = await prisma.product.findUnique({
                    where: {
                        productid: productid
                    }
                });
                if(product)
                {
                    const cartProduct = await prisma.cartProduct.create({
                        data: {
                            cartid: cart.cartid,
                            productid: productid,
                            quantity:quantity,
                            price:product.price*quantity
                        }
                    });
                    return c.json(cartProduct);
                }
                else
                {
                    return c.json({error: 'Invalid product id'});
                }
            }
            else
            {
                return c.json({error: 'Cart not found'});
            }
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

//PUT /api/cart/updatecart Update the quantity of a product in the cart.
cartGroup.put('/updatecart', async (c) => {
    const {email,password,productid,quantity}:cartupdate =  await c.req.json();

    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const cart = await prisma.cart.findUnique({
                where: {
                    userid: user.userid
                }
            });
            if(cart)
            {
                const product = await prisma.product.findUnique({
                    where: {
                        productid: productid
                    }
                });
                if(product)
                {
                    const cartProduct = await prisma.cartProduct.update({
                        where: {
                                cartid: cart.cartid,
                                productid: productid
                            },
                        data: {
                            quantity
                        }
                    });
                    return c.json(cartProduct);
                }
                else
                {
                    return c.json({error: 'Invalid product id'});
                }
            }
            else
            {
                return c.json({error: 'Cart not found'});
            }
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



// DELETE /api/cart/cartdelete/:id Remove a product from the cart.
cartGroup.delete('/cartdelete/:id', async (c) => {
    const {email,password}:cartdelete =  await c.req.json();
    const {id}=  c.req.param();
    const productid = parseInt(id);
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const cart = await prisma.cart.findUnique({
                where: {
                    userid: user.userid
                }
            });
            if(cart)
            {
                const product = await prisma.product.findUnique({
                    where: {
                        productid:productid
                    }
                });
                if(product)
                {
                    const cartProduct = await prisma.cartProduct.delete({
                        where: {
                            cartid: cart.cartid,
                            productid:productid
                        }
                    });
                    return c.json(cartProduct);
                }
                else
                {
                    return c.json({error: 'Invalid product id'});
                }
            }
            else
            {
                return c.json({error: 'Cart not found'});
            }
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



export default cartGroup