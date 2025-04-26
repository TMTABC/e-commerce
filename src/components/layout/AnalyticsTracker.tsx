"use client"

import React, {useEffect} from 'react';
import {useCartStore} from "@/stores/cart-store";
import {useShallow} from "zustand/shallow";
import {User} from "@/generated/prisma";

type AnalyticsTrackerProps = {
    user: Partial<User> | null;
}
const AnalyticsTracker = ({user}:AnalyticsTrackerProps) => {
    const {cartId} = useCartStore(
        useShallow((state)=>({
            cartId: state.cartId,
        }))
    )
    useEffect(() => {
        if (!cartId||user) {
            return;
        }
        try {
            const anyWindow = window as any;

            if (anyWindow.umami) {
                anyWindow.umami.identify({
                    cartId,
                });
            }
        }catch(e){
            console.log(e)
        }
    },[cartId,user])

    useEffect(() => {
        if (!user){
            return;
        }
        try {

        }catch(e){
            console.log(e)
        }
    }, [user]);
    return (
        <div>
            <></>
        </div>
    );
};

export default AnalyticsTracker;