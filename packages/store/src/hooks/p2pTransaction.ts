import { authOptions } from "../../../../apps/user-app/app/lib/auth"
import { getServerSession } from 'next-auth';
import prisma from "@repo/db/client";
export async function p2pTransaction(){
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            id: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        from: Number(t.fromUserId),
        to: Number(t.toUserId)
    }));
}
