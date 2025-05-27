import { Component, OnInit } from "@angular/core";
import { Planet } from "../../models/planet.model";
import { PlanetsService } from "../../services/planets.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-planet-details",
  templateUrl: "./planet-details.component.html",
  styleUrls: ["./planet-details.component.scss"],
})
export class PlanetDetailsComponent implements OnInit {
  planet: Planet;
  private unSubscribe = new Subject<void>();
  constructor(private planetService: PlanetsService) {}

  ngOnInit(): void {
    this.planetService.selectedPlanet$
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((planet) => {
        this.planet = planet;
      });
  }
  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
