import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  /**
   * This component is used to create or edit a product
   *
   * @param _api
   */

  public productForm = new FormGroup({
    title: new FormControl(''),
    code: new FormControl(''),
    variants: new FormArray([]),
  });

  constructor(private _api: ApiService, 
    private _route: ActivatedRoute, 
    private _router: Router) { }

  ngOnInit(): void { 
    const productId = this._route.snapshot.paramMap.get('id');
    console.log('productId: ', productId);
  }

  onAddVariant() { }

  onRemoveVariant() { }

  onCreate() { }

  get productFormVariantsArray(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }
}
