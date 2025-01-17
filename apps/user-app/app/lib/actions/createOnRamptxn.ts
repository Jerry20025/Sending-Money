"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client"
export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    try{
        const session = await getServerSession(authOptions);
        if (!session?.user || !session.user?.id) {
            return {
                message: "Unauthenticated request"
            }
        }
        const token = (Math.random() * 1000).toString();
        await prisma.onRampTransaction.create({
            data: {
                provider,
                status: "Processing",
                startTime: new Date(),
                token: token,
                userId: Number(session?.user?.id),
                amount: amount * 100
            }
        });
        await db.$transaction([
            db.balance.updateMany({
              where: {
                userId: Number(session?.user?.id),
              },
              data: {
                amount: {
                  increment: amount * 100,
                },
              },
            }),
        db.onRampTransaction.updateMany({
            where: {
              AND: [
                {
                  token: {
                    contains:token,
                  },
                },
                {
                  status: {
                    equals: 'Processing',
                  },
                },
              ],
            },
            data: {
              status: 'Success',
            },
          })
        ])
        return {
            message: "Done"
        }
    }catch(e){
        console.log(e);
        return {
            message:"something Went Wrong",
        }
    }
}
