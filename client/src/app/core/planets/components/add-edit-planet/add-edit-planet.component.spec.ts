import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPlanetComponent } from './add-edit-planet.component';

describe('AddEditPlanetComponent', () => {
  let component: AddEditPlanetComponent;
  let fixture: ComponentFixture<AddEditPlanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPlanetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
