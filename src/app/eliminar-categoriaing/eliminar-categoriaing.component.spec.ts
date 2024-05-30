import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCategoriaingComponent } from './eliminar-categoriaing.component';

describe('EliminarCategoriaingComponent', () => {
  let component: EliminarCategoriaingComponent;
  let fixture: ComponentFixture<EliminarCategoriaingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarCategoriaingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarCategoriaingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
