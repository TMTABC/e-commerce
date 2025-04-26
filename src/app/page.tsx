// import { getAllProducts } from "@/sanity/lib/client";
// import SalesCampaingBanner from "@/components/layout/SalesCampaingBanner";
// import ProductGrid from "@/components/product/ProductGrid";
// import WheelOfFortune from "@/components/layout/WheelOfFortune";
// import {getWheelOfFortureConfiguration} from "@/action/wheel-of-forture-action";
//
// export default async function Home() {
//     const products = await getAllProducts();
//     const {randomProducts , winningIndex} = await getWheelOfFortureConfiguration();
//
//     return (
//         <div>
//             <SalesCampaingBanner/>
//             <WheelOfFortune products={randomProducts} winningIndex={winningIndex} />
//             <section className="container mx-auto px-8">
//                 <ProductGrid products={products} />
//             </section>
//         </div>
//     );
// }
import { getAllProducts } from '@/sanity/lib/client';
import { getWheelOfFortureConfiguration } from '@/action/wheel-of-forture-action';
import ClientHome from '@/components/layout/ClientHome';

export default async function Home() {
    const products = await getAllProducts();
    const { randomProducts, winningIndex } = await getWheelOfFortureConfiguration();

    return (
        <ClientHome
            products={products}
            wheelProducts={randomProducts}
            winningIndex={winningIndex}
        />
    );
}
