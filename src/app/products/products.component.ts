import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, IQueryResponse } from '../../core/api.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Product } from 'src/models/Product.model';
import * as moment from 'moment';
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProductsComponent implements OnInit {
  searchField: FormControl;
  productsCache: Product[] = [];
  productsFiltered: Product[] = [];
  orderType: string = 'hot';

  /**
   * This component is used to display list of products available for a given user
   *
   * @param _api
   */

  constructor(private _api: ApiService, private _router: Router) {
    this.searchField = new FormControl('');
  }

  async ngOnInit(): Promise<void> { 
    this.getProducts();
    this.sortHot();
  }

  getProducts():void{
    this._api.getProducts().subscribe((state: IQueryResponse) => {
      this.productsCache = state.data as Product[];
    })
  }

  onSearch(query: string) { }

  onCreateProductButtonClick() {
    this._router.navigateByUrl('/create-product');
  }

  onToggleProductsType(productType: string) { 
    switch (productType) {
      case 'hot':
        this.orderType = 'hot';
        this.sortHot();
        break;
      case 'upcoming':
        this.orderType = 'upcoming'
        this.sortUpcoming();
        break;
      default:
        break;
    }
  }

  onSortByClick(sortBy: string) { }

  onEditProductButtonClick(id: number) {
    this._router.navigateByUrl(`/edit-product/${id}`);
  }

  getMomentStr(dateStr: any) {
    return moment(dateStr).fromNow();
  }

  sortHot(): void {
    this.productsFiltered =  this.productsCache.sort((a,b) => {
      if ((a.salesLast72Hrs && b.salesLast72Hrs) &&  (a.salesLast72Hrs < b.salesLast72Hrs)) {
        return 1;
      }
      if ((a.salesLast72Hrs && b.salesLast72Hrs) &&  (a.salesLast72Hrs > b.salesLast72Hrs)) {
        return -1;
      }
      return 0;
    })
  }

  sortUpcoming(): void {
    this.productsFiltered = this.productsCache.sort((a,b) => {
      const relDateA = a.releaseDate ? new Date(a.releaseDate?.toString()) : null;
      const relDateB = b.releaseDate ? new Date(b.releaseDate?.toString()) : null;

      if ((relDateA && relDateB) &&  (relDateB.getTime() < relDateB.getTime())) {
        return 1;
      }
      if ((relDateA && relDateB) &&  (relDateA.getTime() > relDateB.getTime())) {
        return -1;
      }
      return 0;
    })
  }

  doSearch(): void{
    this.productsFiltered = this.productsCache.filter((product) => {
      return product.title.includes(this.searchField.value) || product.code.includes(this.searchField.value);
    })
  }
}
