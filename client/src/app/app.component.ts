import {Component, OnInit} from '@angular/core';
import { PlanetsService } from './core/planets/services/planets.service';
import { Planet } from './core/planets/models/planet.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  
  }
} 
