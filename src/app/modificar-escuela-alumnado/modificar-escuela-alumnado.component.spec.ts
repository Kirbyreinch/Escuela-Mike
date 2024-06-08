import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEscuelaAlumnadoComponent } from './modificar-escuela-alumnado.component';

describe('ModificarEscuelaAlumnadoComponent', () => {
  let component: ModificarEscuelaAlumnadoComponent;
  let fixture: ComponentFixture<ModificarEscuelaAlumnadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarEscuelaAlumnadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarEscuelaAlumnadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
