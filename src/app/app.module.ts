import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { ComuniComponent } from './pages/comuni/comuni.component';
import { ComuneComponent } from './pages/comune/comune.component';
import { ErroreComponent } from './pages/errore/errore.component';
import { MappaCalabriaComponent } from './components/mappa-calabria/mappa-calabria.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './_utili/guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';


// MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ComuniComponent,
    ErroreComponent,
    MappaCalabriaComponent,
    ComuneComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [AuthService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
