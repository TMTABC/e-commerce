import React from 'react';
import {redirect} from "next/navigation";
import Stripe from "stripe";

const getCheckoutSession = async (sessionId:string)=>{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
        apiVersion: '2025-03-31.basil'
    });
    return stripe.checkout.sessions.retrieve(sessionId);
}


const CheckoutSuccessPage = async ({searchParams}:{searchParams:Promise<{session_id:string}>}) => {
    const {session_id} = await searchParams;
    if(!session_id){
        redirect('/');
    }

    const session = await getCheckoutSession(session_id);
    if(!session){
        redirect('/');
    }
    return (
        <div className={"min-h-[60vh] flex items-center justify-center"}>
            <div className={"max-w-md w-full mx-auto p-6"}>
                <div className={"bg-white shadow-xl rounded-2xl p-6 text-center"}>
                    <div className={"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2l4-4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10z"
                            />
                        </svg>
                    </div>
                    <h1 className={"text-2xl font-bold text-gray-900 mb-2"}>
                        Thanks you for order!
                    </h1>
                    <p className={"text-gray-600 mb-6"}>
                        We have received your order, and will send you a confirmation  email shortly!
                    </p>
                    <div className={"text-sm text-gray-500"}>
                        Order Total: {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: session.currency || "USD",
                    }).format((session.amount_total || 0)/100)}
                    </div>
                    <div className={"text-sm text-gray-500"}>
                        Order email: {session.customer_details?.email || ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccessPage;