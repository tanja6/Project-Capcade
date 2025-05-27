import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './core/planets/components/landing-page/landing-page.component';
import { PlanetDetailsComponent } from './core/planets/components/planet-details/planet-details.component';


const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'details/:id', component: PlanetDetailsComponent },  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
