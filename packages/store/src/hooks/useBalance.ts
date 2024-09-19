import { useRecoilValue } from "recoil"
import { balanceAtom } from "../atoms/balance"
import { useSession } from 'next-auth/react';
export const useBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}