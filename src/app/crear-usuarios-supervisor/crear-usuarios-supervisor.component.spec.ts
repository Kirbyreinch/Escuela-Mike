import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuariosSupervisorComponent } from './crear-usuarios-supervisor.component';

describe('CrearUsuariosSupervisorComponent', () => {
  let component: CrearUsuariosSupervisorComponent;
  let fixture: ComponentFixture<CrearUsuariosSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearUsuariosSupervisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearUsuariosSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
