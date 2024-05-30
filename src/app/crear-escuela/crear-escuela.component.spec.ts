import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEscuelaComponent } from './crear-escuela.component';

describe('CrearEscuelaComponent', () => {
  let component: CrearEscuelaComponent;
  let fixture: ComponentFixture<CrearEscuelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearEscuelaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
