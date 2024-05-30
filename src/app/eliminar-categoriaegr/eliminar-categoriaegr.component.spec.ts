import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCategoriaegrComponent } from './eliminar-categoriaegr.component';

describe('EliminarCategoriaegrComponent', () => {
  let component: EliminarCategoriaegrComponent;
  let fixture: ComponentFixture<EliminarCategoriaegrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarCategoriaegrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarCategoriaegrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
