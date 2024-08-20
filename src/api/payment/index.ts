import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client'; // Import the 'Product' type
import * as bcrypt from 'bcrypt';
const paymentGroup = new Hono();
const prisma = new PrismaClient();

// Payment
// POST /api/payments: Process a payment.
// GET /api/payments/:id: Get payment details by ID.


interface processpayment
{
    email:string;
    password:string;
    orderId:number;
    amount:number;
    paymentMethod:string;
}
interface paymentdetails{
    email:string;
    password:string;
}

// POST /api/payments: Process a payment.
paymentGroup.post('/processpayment', async (c) => {
    const {email,password,orderId,amount,paymentMethod}:processpayment =  await c.req.json();
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
                    id: orderId
                }
            });
            if(order)
            {
                if(order.totalAmount===amount)
                {
                    const payment = await prisma.payment.create({
                        data: {
                            userid: user.userid,
                            orderId,
                            amount,
                            paymentMethod
                        }
                    });
                    return c.json(payment);
                }
                else
                {
                    return c.json({error: 'Invalid amount'});
                }
            }
            else
            {
                return c.json({error: 'Invalid order ID'});
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

// GET /api/payments/:paymentid: Get payment details by ID.
paymentGroup.get('paymentdetails/:paymentid', async (c) => {
    const {email,password}:paymentdetails =  await c.req.json();
    const {paymentid}=c.req.param();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            const payment = await prisma.payment.findUnique({
                where: {
                    userid: user.userid,
                    paymentid:parseInt(paymentid)
                }
            });
            return c.json(payment);
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

export default paymentGroup