import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products-form/products-form.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
    },
    {
        path: 'create-product',
        component: ProductsFormComponent,
    },
    {
        path: 'edit-product/:id',
        component: ProductsFormComponent,
    },
];
