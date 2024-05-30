import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrl: './eliminar-usuario.component.css'
})
export class EliminarUsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close({ confirm: true });
  }
}
