import { type SchemaTypeDefinition } from "sanity";
import { customerType } from "./customerType";
import { productType } from "./productTypes";
import { orderType } from "./orderType";
import { categoryType } from "./categoryType";
import { paginationViewType } from "./paginationViewType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    customerType,
    productType,
    orderType,
    paginationViewType,
  ],
};
