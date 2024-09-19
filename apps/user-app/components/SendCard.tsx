"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [error,setError]=useState(false);
    const [sender,setSender]=useState(false);
    const [receiver,setReceiver]=useState(false);
    const router=useRouter();
    return <div className="h-[90vh]">hello
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex flex-col justify-center">
                        <Button onClick={async ()=>{
                             try{
                                const response =await p2pTransfer(number, Number(amount) * 100)
                                if(response?.status===400){
                                    setSender(true)
                                    setError(false)
                                }
                                else if(response?.status===403){
                                    setReceiver(true);
                                    setError(false)
                                }
                                else {
                                    router.push('/dashboard')
                                }
                            }catch(e){
                                console.log(e);
                                setSender(false)
                                setReceiver(false);
                                setError(true);
                            }
                        }}>Send</Button>
                        {error && (<div className="text-red-600 flex justify-center underline">Insufficent Balance or Same User</div>)}
                        {sender && (<div className="text-red-600 flex justify-center underline">Sender Doesn't Exists</div>)}
                        {receiver && (<div className="text-red-600 flex justify-center underline">Receiver not Exists</div>)}
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}