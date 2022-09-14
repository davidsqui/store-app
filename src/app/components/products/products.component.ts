import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  NewProduct,
  Product,
  UpdateProduct
} from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { StoreService } from './../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[];
  total = 0;
  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter();
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
    },
  };

  constructor(
    private productService: ProductService,
    private storeService: StoreService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // this.loadMore();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onShowDetail(id: string) {
    this.productService.getProduct(id).subscribe(
      (data) => {
        this.toggleProductDetail();
        this.productChosen = data;
      },
      (error) => {
        window.alert(error);
      }
    );
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  createProduct() {
    const product: NewProduct = {
      title: 'new product',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2,
    };
    this.productService.createProduct(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProduct = {
      title: 'new title',
    };
    const id = this.productChosen.id;
    this.productService.updateProduct(id, changes).subscribe((data) => {
      const index = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[index] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productService.deleteProduct(id).subscribe(() => {
      const index = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(index, 1);
      this.showProductDetail = false;
    });
  }

  onLoadMore() {
    this.loadMore.emit();
  }
}
