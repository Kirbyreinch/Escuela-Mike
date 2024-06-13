import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDatosSupervisorComponent } from './modificar-datos-supervisor.component';

describe('ModificarDatosSupervisorComponent', () => {
  let component: ModificarDatosSupervisorComponent;
  let fixture: ComponentFixture<ModificarDatosSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarDatosSupervisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarDatosSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
