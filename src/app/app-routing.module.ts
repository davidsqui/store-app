import { LayoutComponent } from './website/components/layout/layout.component';
import { ProductDetailComponent } from './website/pages/product-detail/product-detail.component';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './website/pages/category/category.component';
import { HomeComponent } from './website/pages/home/home.component';
import { LoginComponent } from './website/pages/login/login.component';
import { ProfileComponent } from './website/pages/profile/profile.component';
import { RegisterComponent } from './website/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'category/:id', component: CategoryComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
