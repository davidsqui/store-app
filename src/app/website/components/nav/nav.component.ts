import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from './../../../models/product.model';
import { User } from './../../../models/user.model';
import { AuthService } from './../../../services/auth.service';
import { CategoriesService } from './../../../services/categories.service';
import { StoreService } from './../../../services/store.service';

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
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getCategories();
    this.authService.user$.subscribe((data) => {
      this.profile = data;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
      .login('admin@mail.com', 'admin123')
      .pipe(switchMap(() => this.authService.getProfile()))
      .subscribe((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/profile']);
      });
  }

  getCategories() {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
