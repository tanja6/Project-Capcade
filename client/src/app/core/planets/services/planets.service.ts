import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Planet, ViewMode } from "../models/planet.model";

@Injectable({
  providedIn: "root",
})
export class PlanetsService {
  api: string = "/api/planets";
  private viewModeSubject: BehaviorSubject<ViewMode> = new BehaviorSubject(
    "grid"
  );
  viewMode$ = this.viewModeSubject.asObservable();

  setView(mode: ViewMode) {
    this.viewModeSubject.next(mode);
  }

  private searchSubject = new Subject<string>();
  search$ = this.searchSubject.asObservable();

  setSearch(value: string) {
    this.searchSubject.next(value);
  }
  constructor(private http: HttpClient) {}

  getAllPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(this.api);
  }
  getOnePlanet(id: number): Observable<Planet> {
    return this.http.get<Planet>(`${this.api}/${id}`);
  }
  createPlanet(planet): Observable<any> {
    return this.http.post(this.api, planet);
  }
  updatePlanet(id: number, planet: Planet): Observable<any> {
    return this.http.put(`${this.api}/${id}`, planet);
  }
  deletePlanet(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
  reloadPlanets(): Observable<any> {
    return this.http.get(`${this.api}/reload`);
  }
}
