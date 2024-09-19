import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../apps/user-app/app/lib/auth';
import prisma from '@repo/db/client';
export const useAmount=async ()=> {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}