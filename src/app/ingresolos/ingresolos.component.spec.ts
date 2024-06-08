import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresolosComponent } from './ingresolos.component';

describe('IngresolosComponent', () => {
  let component: IngresolosComponent;
  let fixture: ComponentFixture<IngresolosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresolosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
