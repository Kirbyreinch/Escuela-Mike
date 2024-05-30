import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUsuariorolComponent } from './modificar-usuariorol.component';

describe('ModificarUsuariorolComponent', () => {
  let component: ModificarUsuariorolComponent;
  let fixture: ComponentFixture<ModificarUsuariorolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarUsuariorolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarUsuariorolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
