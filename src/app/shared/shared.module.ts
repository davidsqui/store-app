import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { ImageComponent } from './../shared/components/image/image.component';
import { ProductComponent } from './../shared/components/product/product.component';
import { ProductsComponent } from './../shared/components/products/products.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    ImageComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
  ],
  exports: [
    ImageComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
  ],
  imports: [CommonModule, RouterModule, SwiperModule],
})
export class SharedModule {}
