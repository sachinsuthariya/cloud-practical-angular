import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
    {
        path: '',
        component: CartComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
  declarations: [
    CartComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CartModule { }
