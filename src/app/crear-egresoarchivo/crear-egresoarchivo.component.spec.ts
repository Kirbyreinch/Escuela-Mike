import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEgresoarchivoComponent } from './crear-egresoarchivo.component';

describe('CrearEgresoarchivoComponent', () => {
  let component: CrearEgresoarchivoComponent;
  let fixture: ComponentFixture<CrearEgresoarchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearEgresoarchivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEgresoarchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
