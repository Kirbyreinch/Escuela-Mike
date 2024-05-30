import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelasComponent } from './escuelas.component';

describe('EscuelasComponent', () => {
  let component: EscuelasComponent;
  let fixture: ComponentFixture<EscuelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscuelasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
