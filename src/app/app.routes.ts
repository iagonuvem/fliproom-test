import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products-form/products-form.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
    },
    {
        path: 'new-product',
        component: ProductsFormComponent,
    },
];
