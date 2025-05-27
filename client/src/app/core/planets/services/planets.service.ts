import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { Planet, ViewMode } from "../models/planet.model";
import { catchError } from "rxjs/operators";

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

  private planetListSubject: BehaviorSubject<Planet[]> = new BehaviorSubject(
   []
  );
  planetList$ = this.planetListSubject.asObservable();

  updatePlanetList(planets: Planet[]) {
    this.planetListSubject.next(planets);
  }

  private selectedPlanetSubject: Subject<Planet> = new Subject();
  selectedPlanet$ = this.selectedPlanetSubject.asObservable();

  updateSelectedPlanet(planet: Planet) {
    this.selectedPlanetSubject.next(planet);
  }

  constructor(private http: HttpClient) {

   this.fetchPlanets();

  }

  fetchPlanets(){
    this.getAllPlanets().pipe(
    catchError(error => {
      console.error('Failed to fetch planets', error);
      return of([]); 
    })
  ).subscribe((planets)=>this.updatePlanetList(planets))
  }

  getAllPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(this.api);
  }
  getOnePlanet(id: number): Observable<Planet> {
    return this.http.get<Planet>(`${this.api}/${id}`);
  }
  createPlanet(planet): Observable<any> {
    return this.http.post(this.api, planet);
  }
  updatePlanet(id: number, planet: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, planet);
  }
  deletePlanet(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
  reloadPlanets(): Observable<any> {
    return this.http.get(`${this.api}/reload`);
  }
}
