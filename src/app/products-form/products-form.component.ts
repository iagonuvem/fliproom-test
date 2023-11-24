import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../core/api.service';

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

  constructor(private _api: ApiService) {}

  ngOnInit(): void {}

  onAddVariant() {}

  onRemoveVariant() {}

  onCreate() {}

  get productFormVariantsArray(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }
}
