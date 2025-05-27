import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Planet } from "../../models/planet.model";
import { PlanetsService } from "../../services/planets.service";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Router } from "@angular/router";
@Component({
  selector: "app-planets-table",
  templateUrl: "./planets-table.component.html",
  styleUrls: ["./planets-table.component.scss"],
})
export class PlanetsTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() planets: Planet;
  displayedColumns: string[] = [
    "planetName",
    "planetColor",
    "planetRadiusKM",
    "fromSun",
    "fromEarth",
  ];

  dataSource: MatTableDataSource<Planet>;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    console.log(this.sort);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (
      data: Planet,
      filter: string
    ): boolean {
      return data.planetName.toLowerCase().includes(filter);
    };
  }

  constructor(private planetsService: PlanetsService, private router:Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(changes.planets.currentValue);
  }

  ngOnInit(): void {
    this.planetsService.search$
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((value) => {
        this.dataSource.filter = value;
      });
  }

  openPlanetDetailes(planetId) {
    this.router.navigate(['details',planetId]);
  }
}
