import { ApiService } from 'src/app/shared/api.service';
import { Product } from './../../product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { AppComponent } from 'src/app/app.component';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  product!: Product[];
  p: number = 1;
  query!: string;
  productSearchData: any;
  searchList!:FormGroup;
  formParameter:any
  private unsubscriber: Subject<void> = new Subject<void>();
  constructor(
    private app: AppComponent,
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder,
    public authService: AuthGuard,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAllProduct();

    this.searchList = this.formBuilder.group({
      searchInput: [''],
    });

    history.pushState(null, '');

    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((_) => {
        history.pushState(null, '');
      });
  }
  private getAllProduct() {
    this.api.getProductList().subscribe((data: any) => {
      this.product = data;
    });
  }
  productDetails(productId: number) {
    this.router.navigate(['view-product/' + productId]);
  }
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
  search() {
    this.formParameter=this.searchList.value.searchInput
    console.log(this.searchList.value.searchInput);
    this.api.searchedProduct(this.formParameter)
      .subscribe(res => {
        this.productSearchData = res;
        console.log(this.productSearchData);
      })
      this.router.navigate(['search/'+this.formParameter]);
  }
}
