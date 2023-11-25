import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ProductVariant } from 'src/models/Product.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@capacitor/camera';
import { lastValueFrom } from 'rxjs';

export interface ProductForm {
  imagePath?: any;
  title: FormControl<string | null>;
  code: FormControl<string | null>;
  variants: FormArray<never>;
}
@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProductsFormComponent implements OnInit {
  /**
   * This component is used to create or edit a product
   *
   * @param _api
   */

  operationStr: string = 'Create';
  imageLoading: boolean = false;
  imagePath: string | null = null;
  productId: string | null = null;

  public productForm: FormGroup<ProductForm>;

  constructor(private _api: ApiService,
    private _route: ActivatedRoute,
    private _router: Router,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      variants: new FormArray([], [Validators.required, Validators.minLength(1)]),
    });

    this.productId = this._route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.operationStr = 'Edit'
    }
    console.log(this.productForm);
    console.log('productId: ', this.productId);
  }

  ngOnInit(): void {
  }

  async pickImage(): Promise<void>{
    this.imageLoading = true;
    console.log('pickImage called!');
    const picked = await Camera.pickImages({
      quality: 100,
      limit: 1
    });
    this.imagePath = picked.photos[0].webPath;
    const webPath = picked.photos[0].webPath;
    this.productForm.addControl('imagePath', new FormControl(webPath));

    this.imageLoading = false;
  }
  
  async variantPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Variants',
      message: 'Add a variant name then click save.',
      buttons: [{
        text: 'Save',
        handler: this.onAddVariant.bind(this)
      }],
      inputs: [
        {
          placeholder: 'Name',
        },
      ]
    });

    await alert.present();
  }
  async onAddVariant(data: any[]) {
    let variantData: ProductVariant;
    const variants = this.productFormVariantsArray.value;
    if (variants.length > 0) {
      const _ = this._api.findMaxValues(variants);
      variantData = {
        ID: _.maxID + 1,
        productID: this.productId ? parseInt(this.productId) : _.maxProductID + 1,
        title: data[0] ? data[0] : '',
        position: _.maxPosition + 1,
      };
    } else {
      variantData = {
        ID: 1,
        productID: this.productId ? parseInt(this.productId) : 0,
        title: data[0],
        position: 0,
      };
    }

    const variantsGroup = this.formBuilder.group({
      ID: [variantData.ID],
      productID: [variantData.productID],
      title: [variantData.title],
      position: [variantData.position]
    }) ;

    await this.alertCtrl.dismiss();

    this.productFormVariantsArray.push(variantsGroup);
    this.productForm.get('variants')?.updateValueAndValidity();
  }

  onRemoveVariant(index: any) {
    this.productFormVariantsArray.removeAt(index);
  }

  async onCreate() { 
    console.log(this.productForm)
    console.log(this.productForm.getRawValue());
    const product = await lastValueFrom(this._api.createProduct(this.productForm.getRawValue()));

    this.imageLoading = false;
    this.imagePath = null;
    this.productForm.reset();
    this.productForm.controls.variants.reset();
    this.productForm.controls.variants.setErrors({required: true});
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log(this.productFormVariantsArray.value);
    console.log(ev);
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    const indexFrom = ev.detail.from;
    const indexTo = ev.detail.to;
    
    console.log('indexFrom: ',indexFrom);
    console.log('indexTo: ',indexTo);

    this.productFormVariantsArray.value.map((variant: any, i: number) => { variant.position = i+1 })
    // map(i) from > i position++

    console.log(this.productFormVariantsArray.value);
    ev.detail.complete();
  }

  get productFormVariantsArray(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }
}
