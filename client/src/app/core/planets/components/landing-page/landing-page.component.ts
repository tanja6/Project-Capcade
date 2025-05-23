import { Component, OnDestroy, OnInit } from '@angular/core';
import { Planet, ViewMode } from '../../models/planet.model';
import { PlanetsService } from '../../services/planets.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit,OnDestroy {
  viewMode:ViewMode | null = null;
  planets:Planet[] | null = null;
  private unSubscribe = new Subject<void>();
  constructor(private planetsService:PlanetsService) { }
   
  ngOnInit(): void {
   this.planetsService.viewMode$.pipe(takeUntil(this.unSubscribe)).subscribe((mode)=>this.viewMode = mode )
   this.planetsService.getAllPlanets().subscribe((planets)=>{console.log(planets);this.planets = planets})
  }
   ngOnDestroy() {
        this.unSubscribe.next();
        this.unSubscribe.complete();
    }

}
