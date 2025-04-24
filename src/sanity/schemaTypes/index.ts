import { type SchemaTypeDefinition } from 'sanity'
import promotionCode from "./schemas/promotion-codes";
import productCategory from "./schemas/product-category";
import promotionCampaign from "./schemas/promotion-campaign";
import product from "./schemas/product";
import {order, orderItem, shippingAddress} from "@/sanity/schemaTypes/schemas/order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
      promotionCode,
      promotionCampaign,

      productCategory,
      product,

      shippingAddress,
      orderItem,
      order,
  ],
}
