import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import {Ng2OrderModule} from 'ng2-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './frontend-eccommerce/sign-up/sign-up.component';
import { IntroductionPageComponent } from './frontend-eccommerce/introduction-page/introduction-page.component';
import { HomePageComponent } from './frontend-eccommerce/home-page/home-page.component';
import { ViewProductComponent } from './frontend-eccommerce/view-product/view-product.component';
import LoginComponent from './frontend-eccommerce/login/login.component';
import { FormsModule } from '@angular/forms';
import { NoPageComponent } from './frontend-eccommerce/no-page/no-page.component';
import { SearchPageComponent } from './frontend-eccommerce/search-page/search-page.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    IntroductionPageComponent,
    HomePageComponent,
    ViewProductComponent,
    LoginComponent,
    NoPageComponent,
    SearchPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    Ng2OrderModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
