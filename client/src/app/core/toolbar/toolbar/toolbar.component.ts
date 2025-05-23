import { Component, OnDestroy, OnInit } from "@angular/core";
import { ViewMode } from "../../planets/models/planet.model";
import { PlanetsService } from "../../planets/services/planets.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  viewMode: ViewMode | null = null;
  private unSubscribe = new Subject<void>();
  constructor(private planetService: PlanetsService) {}

  ngOnInit(): void {
    this.planetService.viewMode$
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((mode) => (this.viewMode = mode));
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
}
