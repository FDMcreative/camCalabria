import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ErroreComponent } from './pages/errore/errore.component';
import { ComuniComponent } from './pages/comuni/comuni.component';
import { ComuneComponent } from './pages/comune/comune.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'comuni', pathMatch: 'full', component: ComuniComponent, children: [
      // { path: ':id', component: ComuneComponent }
    ]
  },
  { path: 'comuni/:id', component: ComuneComponent },
  { path: 'login', component: LoginComponent },
  { path: 'errore', component: ErroreComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
