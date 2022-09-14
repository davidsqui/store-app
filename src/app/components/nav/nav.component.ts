import { Category } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { CategoriesService } from './../../services/categories.service';
import { StoreService } from './../../services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private authService: AuthService,
    private categoryService: CategoriesService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
      .login('david@gmail.com', '123')
      .pipe(switchMap(() => this.authService.profile()))
      .subscribe((profile) => (this.profile = profile));
  }

  getCategories() {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
  }
}
