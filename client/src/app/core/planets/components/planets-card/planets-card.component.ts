import { Component, Input, OnInit } from '@angular/core';
import { Planet } from '../../models/planet.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planets-card',
  templateUrl: './planets-card.component.html',
  styleUrls: ['./planets-card.component.scss']
})
export class PlanetsCardComponent implements OnInit {
 @Input() planet:Planet;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
   openPlanetDetailes(planetId){
    this.router.navigate(['details',planetId]);
  }
}
