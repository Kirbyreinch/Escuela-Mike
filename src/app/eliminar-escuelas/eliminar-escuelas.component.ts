import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-escuelas',
  templateUrl: './eliminar-escuelas.component.html',
  styleUrl: './eliminar-escuelas.component.css'
})
export class EliminarEscuelasComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarEscuelasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close({ confirm: true });
  }
}