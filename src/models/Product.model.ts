import { InventoryRecord } from './InventoryRecord.model';

export class Product {
  ID!: number;
  title!: string;
  code!: string;
  variants!: ProductVariant[];
  salesLast72Hrs?: number;
  releaseDate?: Date;
  inventory?: InventoryRecord[];

  constructor(data: any) {
    if (data == null) return;

    data.variants = data.variants.map((v: any) => new ProductVariant(v));
    return Object.assign(this, data);
  }
}

export class ProductVariant {
  ID!: number;
  productID!: number;
  title!: string;
  position!: number;

  constructor(data: any) {
    if (data == null) return;
    return Object.assign(this, data);
  }
}
