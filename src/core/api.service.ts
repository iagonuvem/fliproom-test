import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Product } from '../models/Product.model';
import { HttpClient } from '@angular/common/http';
import { InventoryRecord } from '../models/InventoryRecord.model';
import * as moment from 'moment';

export interface IQueryResponse {
  data: Object[];
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   *
   */
  private _dbProducts: Product[] = [];
  private _dbInventoryRecords: InventoryRecord[] = [];

  constructor(private _http: HttpClient) {
    const numOfProductsToGenerate = 25;
    //Generate product data
    for (let idx = 0; idx < numOfProductsToGenerate; idx++) {
      const body: Product | any = {
        ID: idx + 1,
        title: `${Math.random().toString(36).slice(2)}`,
        code: `${Math.random().toString(36).slice(2)}`,
        variants: [],
        salesLast72Hrs: Math.ceil(Math.random() * 100), //1 to 100
        releaseDate: moment()
          .subtract(Math.round(Math.random() * 100), 'd')
          .format('YYYY-MM-DD'),
      };

      const numOfVariantsToGenerate = Math.ceil(Math.random() * 10); //1 to 10
      for (let vidx = 0; vidx < numOfVariantsToGenerate; vidx++) {
        body.variants.push({
          ID: vidx + 1,
          productID: body.ID,
          title: `${Math.random().toString(36).slice(2)}`,
          position: vidx,
        });
      }

      this._dbProducts.push(new Product(body));
    }

    //Generate inventory data for each variant
    let invID = 1;
    this._dbProducts.map((p) =>
      p.variants.map((v) => {
        this._dbInventoryRecords.push(
          new InventoryRecord({
            ID: invID,
            productID: p.ID,
            productVariantID: v.ID,
            quantity: Math.round(Math.random() * 10), //0 to 10
          })
        );
        invID += 1;
      })
    );
  }

  getProducts(body: any = {}): Observable<IQueryResponse> {
    /**
     * {string} body.search - If this parameter is set, results are filtered by title or code to match the search string
     * {number} body.offset - from what index in the list of results matching the query to return
     * {number} body.limit -  number of records to return
     * {string} body.sort -   any sorting for the results that match the query. Format is salesLast72Hrs:desc or releaseDate:asc
     */
    //return this._http.get<IQueryResponse>(`${this._apiUrl}/products`, body)
    const queryParams = {
      offset: body['offset'] || 0,
      limit: body['limit'] || 10,
      sort: body['sort'] || 'ID:desc',
    };
    let filteredData = this._dbProducts;
    if (body['search']) {
      filteredData = filteredData.filter(
        (prod) =>
          prod.title
            .trim()
            .toLowerCase()
            .includes(body['search'].trim().toLowerCase()) ||
          prod.code
            .trim()
            .toLowerCase()
            .includes(body['search'].trim().toLowerCase())
      );
    }

    //sort data
    filteredData = filteredData.sort((p1, p2) => {
      switch (queryParams['sort']) {
        case 'ID:desc':
          return p1.ID - p2.ID;
        case 'ID:asc':
          return p2.ID - p1.ID;
        case 'salesLast72Hrs:desc':
          if(p2.salesLast72Hrs && p1.salesLast72Hrs){
            return p2.salesLast72Hrs - p1.salesLast72Hrs;
          } else{
            return -1;
          } 
        case 'salesLast72Hrs:asc':
          if(p2.salesLast72Hrs && p1.salesLast72Hrs){
            return p1.salesLast72Hrs - p2.salesLast72Hrs;
          } else{
            return -1;
          } 
        case 'releaseDate:desc':
          return moment(p2.releaseDate).diff(moment(p1.releaseDate));
        case 'releaseDate:asc':
          return moment(p1.releaseDate).diff(moment(p2.releaseDate));
        default:
          return -1;
      }
    });

    // apply offset and limit
    let cutData = filteredData.slice(queryParams.offset, queryParams.limit);

    return of({
      data: cutData,
      count: filteredData.length,
    }).pipe(
      map((resp: IQueryResponse) => {
        resp.data = resp.data.map((product) => new Product(product));
        return resp;
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    //this._http.get<Product>(`${this._apiUrl}/products/${id}`)
    const response = this._dbProducts.filter((p) => p.ID == id);
    return of(response).pipe(map((product: any) => new Product(product)));
  }

  createProduct(body: any): Observable<Product> {
    //return this._http.post<Product>(`${this._apiUrl}/products`, body)
    body['ID'] = this._dbProducts.length + 1;
    this._dbProducts.push(new Product(body));
    return of(body).pipe(map((product: any) => new Product(product)));
  }

  getInventory(productId: number): Observable<IQueryResponse> {
    //return this._http.get<IQueryResponse>(`${this._apiUrl}/inventory-records?productID=${productId}`)
    let filteredData = this._dbInventoryRecords.filter(
      (invRec) => invRec.productID == productId
    );
    return of({
      data: filteredData,
      count: filteredData.length,
    }).pipe(
      map((resp: IQueryResponse) => {
        resp.data = resp.data.map(
          (invRecord) => new InventoryRecord(invRecord)
        );
        return resp;
      })
    );
  }
}
