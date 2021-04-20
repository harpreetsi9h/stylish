import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// used to create fake backend
import { fakeBackendProvider } from "./_helpers";

import { appRoutingModule } from "./app.routing";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home";
import { Home2Component } from "./home2";
import { CartComponent } from "./cart";
import { ContactComponent } from "./contact";
import { CheckoutComponent } from "./checkout";
import { ThankyouComponent } from "./thankyou";
import { GallaryComponent } from "./gallary";
import { LoginComponent } from "./login";
import { RegisterComponent } from "./register";
import { WomenComponent } from "./women";
import { MenComponent } from "./men";
import { ProductComponent } from "./product";
import { ProfileadminComponent } from "./profileadmin";
import { ProductListComponent } from "./product-list";
import { AboutComponent } from "./about";
import { CardinfoComponent } from "./cardinfo";

import { AlertComponent } from "./_components";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    Home2Component,
    CartComponent,
    CheckoutComponent,
    ThankyouComponent,
    GallaryComponent,
    LoginComponent,
    CardinfoComponent,
    RegisterComponent,
    AlertComponent,
    WomenComponent,
    MenComponent,
    ContactComponent,
    AboutComponent,
    ProductComponent,
    ProductListComponent,
    ProfileadminComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
