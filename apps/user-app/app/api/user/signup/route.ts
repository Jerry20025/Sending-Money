// pages/api/auth/signup.ts
"use server"
import { NextResponse } from 'next/server';
import prisma from '@repo/db/client';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        // Log the raw request body
        const rawBody = await req.text();
        console.log('Raw request body:', rawBody);

        // Parse JSON
        let data;
        try {
            data = JSON.parse(rawBody);
        } catch (err) {
            console.error('JSON parsing error:', err);
            return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
        }

        const { name, email, number, password } = data;
        console.log('Parsed data:', { name, email, number, password });

        // Validate input
        if (!name || !email || !number || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { number: number },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                number: number,
                password: hashedPassword,
                Balance: {
                    create: {
                        amount: 20000,
                        locked: 0
                    }
                }
            }
        });
        console.log('User created:', user);

        // Set a cookie
        const res = NextResponse.json({ message: 'User created successfully' });
        res.cookies.set('sessionToken', 'example-token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res;
    } catch (error) {
        console.error('Signup Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
