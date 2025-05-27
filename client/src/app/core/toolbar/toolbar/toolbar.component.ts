import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Planet, ViewMode } from "../../planets/models/planet.model";
import { PlanetsService } from "../../planets/services/planets.service";
import { Subject } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { AddEditPlanetComponent } from "../../planets/components/add-edit-planet/add-edit-planet.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationDialogComponent } from "../../../shared/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  viewMode: ViewMode | null = null;
  private unSubscribe = new Subject<void>();
  @Input() page: string;
  planet: Planet;
  constructor(
    private planetService: PlanetsService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.page === "landing") {
      this.planetService.viewMode$
        .pipe(takeUntil(this.unSubscribe))
        .subscribe((mode) => (this.viewMode = mode));
    } else {
      this.activatedRoute.params
        .pipe(
          takeUntil(this.unSubscribe),
          switchMap((param) => {
            console.log(param);
            return this.planetService.getOnePlanet(param.id);
          })
        )
        .subscribe((planet) => {
          this.planetService.updateSelectedPlanet(planet);
          this.planet = planet;
        });
    }
  }

  setViewMode(mode: ViewMode) {
    this.planetService.setView(mode);
  }

  search(value: string) {
    this.planetService.setSearch(value.trim().toLowerCase());
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  addEditPlanet(isEdit, id?) {
    this.dialog
      .open(AddEditPlanetComponent, {
        width: "500px",
        height: "592px",
        panelClass: "add-edit-dialog",

        data: {
          isEdit: isEdit,
          planetId: id,
        },
      })
      .afterClosed()
      .subscribe((v) => {
        if (!v[0]) return;
        if (v[1]) {
          this.planetService
            .getOnePlanet(this.planet.id)
            .subscribe((v) => this.planetService.updateSelectedPlanet(v));
        }
        this.planetService.fetchPlanets();
      });
  }

  deletePlanet(id) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          mode: "delete",
          planetName: this.planet.planetName,
        },
        panelClass: "confirm-panel-class",
      })
      .afterClosed()
      .subscribe((v) => {
        if (v) {
          this.planetService.deletePlanet(id).subscribe((v) => {
            this.planetService.fetchPlanets();
            this.router.navigate(["home"]);
          });
        }
      });
  }
}
