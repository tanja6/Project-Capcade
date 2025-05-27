import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Planet } from "../../core/planets/models/planet.model";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent implements OnInit {
  mode: "create" | "edit" | "delete";
  message: string;
  title: string;
  planetName: Planet;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  ngOnInit(): void {
    this.mode = this.data.mode;
    this.planetName = this.data.planetName;
    this.message =
      this.mode === "create"
        ? "create "
        : this.mode === "edit"
        ? "edit "
        : "delete";
    this.title =
      this.mode === "create"
        ? "creating "
        : this.mode === "edit"
        ? "editing "
        : "deleteing";
  }

  cancel() {
    this.dialogRef.close(false);
  }
  confirm() {
    this.dialogRef.close(true);
  }
}
