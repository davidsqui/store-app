import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuicklinkModule } from 'ngx-quicklink';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from './../shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { HighlightDirective } from './directives/highlight.directive';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { WebsiteRoutingModule } from './website-routing.module';

@NgModule({
  declarations: [
    NavComponent,
    HighlightDirective,
    HomeComponent,
    MyCartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SwiperModule,
    WebsiteRoutingModule,
    QuicklinkModule,
  ],
})
export class WebsiteModule {}
