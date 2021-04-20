import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { GallaryComponent } from './gallary';
import { CartComponent } from './cart';
import { CheckoutComponent } from './checkout';
import { ThankyouComponent } from './thankyou';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { Home2Component } from './home2';
import { MenComponent } from './men';
import { WomenComponent } from './women';
import { ProductComponent } from './product';
import { ProductListComponent } from './product-list';
import { AboutComponent } from './about';
import { ContactComponent } from './contact';
import { CardinfoComponent } from './cardinfo';
import { ProfileadminComponent } from './profileadmin';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: Home2Component },
    { path: 'women', component: WomenComponent },
    { path: 'men', component: MenComponent },
    { path: 'profileadmin', component: ProfileadminComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'cardinfo/:id', component: CardinfoComponent},
    { path: 'account', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'gallary', component: GallaryComponent, canActivate: [AuthGuard] },
    { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent },
    { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'thankyou', component: ThankyouComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);