import { getCurrentSession } from "@/action/auths";
import { getAllProducts } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import SalesCampaingBanner from "@/components/layout/SalesCampaingBanner";
import ProductGrid from "@/components/product/ProductGrid";

export default async function Home() {
    const { user } = await getCurrentSession();
    const products = await getAllProducts();
    // console.log(products);

    return (
        <div>
            <SalesCampaingBanner/>
            <section className="container mx-auto px-8">
                <ProductGrid products={products} />
            </section>
        </div>
        // <div className="container mx-auto px-4 py-8">
        //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        //         {products.map((product) => (
        //             <div
        //                 key={product._id}
        //                 className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        //             >
        //                 {product.image && (
        //                     <div className="aspect-square relative">
        //                         <img
        //                             src={urlFor(product.image).url()}
        //                             alt={product.title || "Product image"}
        //                             className="object-cover w-full h-full"
        //                         />
        //                     </div>
        //                 )}
        //                 <div className="p-4">
        //                     <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
        //                     <p className="text-gray-600 text-sm mb-2 line-clamp-2">
        //                         {product.description}
        //                     </p>
        //                     <p className="font-bold text-lg">${product.price?.toFixed(2)}</p>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
}
