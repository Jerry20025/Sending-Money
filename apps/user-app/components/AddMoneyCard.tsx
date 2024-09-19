"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [loading, setLoading] = useState(false); // Loading state

    const handleClick = async () => {
        setLoading(true); // Show the loading overlay immediately

        // Simulate a delay (5 seconds)
        setTimeout(async () => {
            try {
                await createOnRampTransaction(provider, amount);
                setInterval(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                console.error('Error creating transaction:', error);
            } finally {
                setLoading(false); // Hide the loading overlay after the delay
            }
        }, 5000); // 5000 milliseconds = 5 seconds
    };

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput 
                    label={"Amount"} 
                    placeholder={"Amount"} 
                    onChange={(value) => setAmount(Number(value))} 
                />
                <div className="py-4 text-left">
                    Bank
                </div>
                <Select 
                    onSelect={(value) => {
                        const selectedBank = SUPPORTED_BANKS.find(x => x.name === value);
                        setRedirectUrl(selectedBank?.redirectUrl || "");
                        setProvider(selectedBank?.name || "");
                    }} 
                    options={SUPPORTED_BANKS.map(x => ({
                        key: x.name,
                        value: x.name
                    }))} 
                />
                <div className="flex justify-center pt-4">
                    {/* @ts-ignore */}
                    <Button onClick={handleClick} disabled={loading}>
                        {loading ? "Loading..." : "Add Money"}
                    </Button>
                </div>
            </div>
            {loading && <LoadingOverlay />} {/* Show the loading overlay when loading */}
        </Card>
    );
};

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
    );
};
