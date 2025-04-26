'use client';

import { useState } from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import SalesCampaingBanner from '@/components/layout/SalesCampaingBanner';
import WheelOfFortune from '@/components/layout/WheelOfFortune';
import { Product } from '@/sanity.types';

type Props = {
    products: Product[];
    wheelProducts: Product[];
    winningIndex: number;
};

export default function ClientHome({ products, wheelProducts, winningIndex }: Props) {
    const [showWheel, setShowWheel] = useState(false);

    return (
        <div>
            <SalesCampaingBanner />

            <button
                onClick={() => setShowWheel(true)}
                className={`
    bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
    text-white font-bold px-6 py-3 rounded-full mb-6 ml-8
    shadow-lg hover:shadow-xl transition-all duration-300
    animate-bounce hover:animate-none
    hover:scale-105 active:scale-95
    border-2 border-white
  `}
            >
                🎯 Open Wheel of Fortune 🎁
            </button>


            <WheelOfFortune
                products={wheelProducts}
                winningIndex={winningIndex}
                forceOpen={showWheel}
                onClose={() => setShowWheel(false)}
            />

            <section className="container mx-auto px-8">
                <ProductGrid products={products} />
            </section>
        </div>
    );
}
