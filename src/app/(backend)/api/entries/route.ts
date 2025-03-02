import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body || !body.type || !body.amount || !body.category || !body.frequency) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const entry = await prisma.entry.create({
            data: {
                type: body.type,
                amount: parseFloat(body.amount),
                category: body.category,
                frequency: body.frequency
            }
        });

        return NextResponse.json(entry, { status: 201 });
    } catch (error) {
        console.error('Error adding entry:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}


export async function GET(){
    try {
        const entries = await prisma.entry.findMany({
            orderBy: {createDate:'desc'}
        })
        return NextResponse.json(entries, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        ); 
    }
}

// Fermez la connexion à Prisma après l'utilisation
process.on('SIGINT', async () => {
    await prisma.$disconnect();
});