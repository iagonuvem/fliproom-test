import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [IonicModule, CommonModule ]
})
export class ProductsComponent implements OnInit {
  /**
   * This component is used to display list of products available for a given user
   *
   * @param _api
   */

  constructor(private _api: ApiService, private _router: Router) {}

  ngOnInit(): void {}

  onSearch(query: string) {}

  onCreateProductButtonClick() {
    this._router.navigateByUrl('/create-product');
  }

  onToggleProductsType(productType: string) {}

  onSortByClick(sortBy: string) {}

  onEditProductButtonClick(id: string){
    this._router.navigateByUrl('/edit-product/'+id);
  }
}
