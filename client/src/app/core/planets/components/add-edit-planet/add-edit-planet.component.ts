import { Component, Inject, OnInit } from "@angular/core";
import {
  EmailValidator,
  Form,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { PlanetsService } from "../../services/planets.service";
import { Planet } from "../../models/planet.model";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ConfirmationDialogComponent } from "../../../../shared/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-add-edit-planet",
  templateUrl: "./add-edit-planet.component.html",
  styleUrls: ["./add-edit-planet.component.scss"],
})
export class AddEditPlanetComponent implements OnInit {
  isEdit: boolean = false;
  form: FormGroup;
  selectedFileName: string | null = null;
  selectedFile;
  planet: Planet;
  private unSubscribe = new Subject<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private planetService: PlanetsService,
    private dialogRef: MatDialogRef<AddEditPlanetComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.form = this.fb.group({
      planetName: ["", Validators.required],
      planetColor: ["", Validators.required],
      planetRadiusKM: ["", Validators.required],
      distInMillionsKM: this.fb.group({
        fromSun: [""],
        fromEarth: [""],
      }),
      description: [""],
    });

    this.isEdit && this.populateForm();
  }
  populateForm() {
    this.planetService
      .getOnePlanet(this.data.planetId)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((v) => {
        this.planet = v;
        this.form.get("planetName").setValue(this.planet.planetName);
        this.form.get("planetColor").setValue(this.planet.planetColor);
        this.form.get("planetRadiusKM").setValue(this.planet.planetRadiusKM);
        this.form
          .get("distInMillionsKM")
          .setValue(this.planet.distInMillionsKM);
        this.form
          .get("distInMillionsKM.fromSun")
          .setValue(this.planet.distInMillionsKM.fromSun);
        this.form
          .get("distInMillionsKM.fromEarth")
          .setValue(this.planet.distInMillionsKM.fromEarth);
        this.form.get("description").setValue(this.planet.description);
      });
  }
  onSubmit() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          mode: this.isEdit ? "edit" : "create",
          planetName: this.form.get("planetName").value,
        },
        panelClass: "confirm-panel-class",
      })
      .afterClosed()
      .subscribe((v) => {
        if (v) {
          const rawData = this.form.getRawValue();

          const formData = new FormData();
          formData.append("planetName", rawData.planetName);
          formData.append("planetColor", rawData.planetColor);
          formData.append("planetRadiusKM", rawData.planetRadiusKM);
          formData.append(
            "distInMillionsKM[fromSun]",
            rawData.distInMillionsKM.fromSun
          );
          formData.append(
            "distInMillionsKM[fromEarth]",
            rawData.distInMillionsKM.fromEarth
          );
          formData.append("description", rawData.description || "");

          //problem with image -  invalid grant
          //   if (this.selectedFile) {
          //   formData.append('file', this.selectedFile);
          // }
          if (this.isEdit) {
            this.planetService
              .updatePlanet(this.planet.id, formData)
              .subscribe((res) => {
                this.dialogRef.close([res, this.isEdit]);
                console.log("Uspešno!", res);
              });
          } else
            this.planetService.createPlanet(formData).subscribe((res) => {
              this.dialogRef.close([res, this.isEdit]);
              console.log("Uspešno!", res);
            });
        }
      });
  }

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith("image/")) {
        this.selectedFile = file;
        this.selectedFileName = file.name;
        // this.form.get('imageUrl').setValue(this.selectedFileName)
      } else {
        this.selectedFileName = null;
        input.value = "";
      }
    }
  }
  removeFile(): void {
    this.selectedFileName = null;

    const input = document.getElementById("fileUpload") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
