export class InventoryRecord {
  ID!: number;
  productID!: number;
  productVariantID!: number;
  quantity!: number;

  constructor(data: any) {
    if (data == null) return;

    return Object.assign(this, data);
  }
}
