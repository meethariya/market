import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { CustomerModule } from './modules/customer/customer.module';
import { UserAuthModule } from './modules/user-auth/user-auth.module';

import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
} from 'ngx-ui-loader';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductModule } from './modules/product/product.module';
import { ManagerModule } from './modules/manager/manager.module';
import { FacetModule } from './modules/facet/facet.module';

const loaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#ada2ff', //purple
  bgsOpacity: 0.1,
  bgsPosition: 'center-center',
  bgsSize: 0,
  bgsType: 'wandering-cubes',
  blur: 0,
  delay: 0,
  fastFadeOut: false,
  fgsColor: '#ada2ff', //purple
  fgsPosition: 'center-center',
  fgsSize: 0,
  fgsType: 'wandering-cubes',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40,40,40,0)',
  pbColor: '#FFE5F1', //peach
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#ada2ff', //purple
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 50,
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    UserAuthModule,
    CustomerModule,
    ProductModule,
    ManagerModule,
    FacetModule,
    NgxUiLoaderModule.forRoot(loaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
