import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './core/toolbar/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { PlanetsTableComponent } from './core/planets/components/planets-table/planets-table.component';
import { LandingPageComponent } from './core/planets/components/landing-page/landing-page.component';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PlanetsCardComponent } from './core/planets/components/planets-card/planets-card.component';
import { AddEditPlanetComponent } from './core/planets/components/add-edit-planet/add-edit-planet.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpErrorInterceptor } from './core/planets/services/interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PlanetDetailsComponent } from './core/planets/components/planet-details/planet-details.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, PlanetsTableComponent, LandingPageComponent, PlanetsCardComponent, AddEditPlanetComponent, PlanetDetailsComponent, ConfirmationDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
     {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
