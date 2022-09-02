import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: ProductAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: ProductAddComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
