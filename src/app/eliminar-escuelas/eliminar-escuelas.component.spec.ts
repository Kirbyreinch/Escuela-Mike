import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEscuelasComponent } from './eliminar-escuelas.component';

describe('EliminarEscuelasComponent', () => {
  let component: EliminarEscuelasComponent;
  let fixture: ComponentFixture<EliminarEscuelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarEscuelasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
