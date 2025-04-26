"use client"
import React, {useState} from 'react';
import {Product} from "@/sanity.types";
import {Loader2} from "lucide-react";
import {formatPrice} from "@/lib/utils";
import {useCartStore} from "@/stores/cart-store";
import {useShallow} from "zustand/shallow";
import {urlFor} from "@/sanity/lib/image";

type AddToCartButtonProps = {
    product: Product;
}
const AddToCartButton = ({product}: AddToCartButtonProps) => {
    const {cartId,addItem,open} = useCartStore(
        useShallow((state)=>({
            addItem:state.addItem,
            open:state.open,
            cartId:state.cartId,
        }))
    )

    const [isLoading, setIsLoading] = useState(false);
    const handAddToCart = async () => {
        if(!product.title || product.price === undefined || !product.image) {
            return;
        }
        setIsLoading(true);
        // Add item to cart
        await new Promise(resolve => {setTimeout(resolve, 600)});
        addItem({
            id:product._id,
            title:product.title,
            price:product.price,
            image:urlFor(product.image).url(),
            quantity:1,
        })
        try {
            const anyWindow = window as any;

            if (anyWindow.umami) {
                anyWindow.umami.track('add-to-cart', {
                    cartId: cartId,
                    productId: product._id,
                    productName: product.title,
                    price: product.price,
                    currency: "USD"
                })
            }
        }catch(error) {

        }
        setIsLoading(false);
        open();
    }
    if (!product.price) {
        return null;
    }
    return (
        <button
            onClick={handAddToCart}
            disabled={isLoading}
            className={`
                w-full mt-6 bg-gradient-to-r from-red-500 to-red-600
                text-white py-4 rounded-full text-xl font-bold
                hover:from-red-600 hover:to-red-700
                transition transform
                hover:scale-[1.02] active:scale-[1.02]
                shadow-xl flex items-center justify-center gap-3
                disabled:opacity-80 disabled:cursor-not-allowed
                disabled:hover:scale-100 disabled:active:scale-100
                disabled:hover:from-red-500 disabled:hover:to-red-600
            `}
        >
            {isLoading ? (
                <>
                    <Loader2 className={"w-6 h-6 animate-spin"}/>
                    <span>Adding to cart ...</span>
                </>
            ):(
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M7 18c-1.104 0-1.99.896-1.99 2s.886 2 1.99 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2c1.103 0 1.99-.896 1.99-2s-.887-2-1.99-2zM7.163 5l-.94-2H1v2h3.19l3.6 7.59-1.35 2.44C6.163 15.37 7 17 8.5 17h12v-2H8.88c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03L21.88 6H7.163z" />
                    </svg>
                    Add to cart - {formatPrice(product.price)}
                </>
            )}
        </button>
    );
};

export default AddToCartButton;