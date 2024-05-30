import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCategoriaingComponent } from './crear-categoriaing.component';

describe('CrearCategoriaingComponent', () => {
  let component: CrearCategoriaingComponent;
  let fixture: ComponentFixture<CrearCategoriaingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearCategoriaingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearCategoriaingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
