import { SearchPageComponent } from './frontend-eccommerce/search-page/search-page.component';
import { NoPageComponent } from './frontend-eccommerce/no-page/no-page.component';
import { ViewProductComponent } from './frontend-eccommerce/view-product/view-product.component';
import LoginComponent from './frontend-eccommerce/login/login.component';
import { HomePageComponent } from './frontend-eccommerce/home-page/home-page.component';
import { SignUpComponent } from './frontend-eccommerce/sign-up/sign-up.component';
import { IntroductionPageComponent } from './frontend-eccommerce/introduction-page/introduction-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component: IntroductionPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'view-product/:id',
    component: ViewProductComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search/:query', component: SearchPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
