import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './core/planets/components/landing-page/landing-page.component';


const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  // { path: 'items', component: ItemsComponent },  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
