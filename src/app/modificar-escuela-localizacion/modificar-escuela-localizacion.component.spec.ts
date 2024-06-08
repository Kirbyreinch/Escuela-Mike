import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEscuelaLocalizacionComponent } from './modificar-escuela-localizacion.component';

describe('ModificarEscuelaLocalizacionComponent', () => {
  let component: ModificarEscuelaLocalizacionComponent;
  let fixture: ComponentFixture<ModificarEscuelaLocalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarEscuelaLocalizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarEscuelaLocalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
