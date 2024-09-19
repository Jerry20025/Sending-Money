import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { OnRampTransactions } from '../../../components/OnRampTransactions';
import { P2P } from "../../../components/P2P";
import { getBalance } from '../../../../../packages/store/src/hooks/getBalance';
import { RampTransaction } from "@repo/store/RampTransaction";
import {p2pTransaction}  from "@repo/store/p2pTransaction";
async function useDetails() {
    const session = await getServerSession(authOptions);
    return session;
}
export default async function Dashboard() {
    const balance = await getBalance();
    const onRamp = await RampTransaction();
    const session = await useDetails();
    const p2p = await p2pTransaction();

    return (
        <div className="flex flex-col items-center p-6 space-y-8 w-full max-w-screen-lg mx-auto">
            {/* Profile and Balance Section */}
            <div className="w-full bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-2">Profile</h2>
                <hr />
                <div className="space-y-2">
                    <div className="flex justify-between mt-2">
                        <span className="font-semibold">Name:</span>
                        <span>{session?.user?.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Number:</span>
                        <span>{session?.user?.number || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Email:</span>
                        <span>{session?.user?.email || 'N/A'}</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <span className="text-xl font-semibold">Balance:</span>
                    {/* @ts-ignore */}
                    <span className="text-xl font-semibold">Rupee: {balance.amount/ 100}</span>
                </div>
            </div>

            {/* Rest of the Sections in a Grid Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">On-Ramp Transactions</h2>
                    <OnRampTransactions key={Math.random()} transactions={onRamp} />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">P2P Transactions</h2>
                    <P2P key={Math.random()} transactions={p2p} />
                </div>
            </div>
        </div>
    );
}
