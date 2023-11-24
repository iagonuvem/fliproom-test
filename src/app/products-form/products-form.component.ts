import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductsFormComponent implements OnInit {
  /**
   * This component is used to create or edit a product
   *
   * @param _api
   */

  operationStr: string = 'Create';

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
    if(productId){
      this.operationStr = 'Edit'
    }
    console.log('productId: ', productId);
  }

  onAddVariant() { }

  onRemoveVariant() { }

  onCreate() { }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }
  
  get productFormVariantsArray(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }
}
