import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const userGroup = new Hono();
const prisma = new PrismaClient();

interface register{
    name:string,
    email:string,
    password:string,
    address:string,
    phone:string
}

interface updateuser{
    name:string,
    email:string,
    address:string,
    phone:string
    oldPassword:string
    newPassword:string
}

interface login{
    email:string,
    password:string
}

// GET /users/register
userGroup.post('/register', async (c) => {
    const {name,email,password,address,phone}:register=  await c.req.json();
    try
    {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                address,
                phone
            }
        });
        return c.json(user);
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

// POST /users/login
userGroup.post('/login', async (c) => {
    const {email,password}:login =  await c.req.json();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(user&& await bcrypt.compare(password, user.password))
        {
            return c.json(user);
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

// GET /users/user/id
userGroup.get('get/user/:id', async (c) => {
    const {id} =  c.req.param();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                userid: parseInt(id)
            }
        });
        if(user)
        {
            return c.json(user);
        }
        else
        {
            return c.json({error: 'User not found'});
        }
    }
    catch(err)
    {
        return c.json({error: (err as Error).message});
    }
})

// PUT /users/update/id
userGroup.put('update/user/:id', async (c) => {
    const {id}=  c.req.param();
    const {name,email,address,phone,oldPassword,newPassword}:updateuser =  await c.req.json();
    try
    {
        //check the user exists and old password is correct before change it
        const user = await prisma.user.findUnique({
            where: {
                userid: parseInt(id)
            }
        });
        if(user&& await bcrypt.compare(oldPassword, user.password))
        {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const user = await prisma.user.update({
                where: {
                    userid: parseInt(id)
                },
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    address,
                    phone
                }
            });
            return c.json(user);
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

// DELETE /users/delete/user/id
userGroup.delete('delete/user/:id', async (c) => {
    const {id} =  c.req.param();
    const {email,password}:login =  await c.req.json();
    try
    {
        const user = await prisma.user.findUnique({
            where: {
                userid: parseInt(id)
            }
        });
        if(user&&user.email===email&& await bcrypt.compare(password, user.password))
        {
            const user = await prisma.user.delete({
                where: {
                    userid: parseInt(id)
                }
            });
            return c.json(user);
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

export default userGroup;