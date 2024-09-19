import { authOptions } from "../../../../apps/user-app/app/lib/auth"
import { getServerSession } from 'next-auth';
import prisma from "@repo/db/client";
export async function RampTransaction() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
}