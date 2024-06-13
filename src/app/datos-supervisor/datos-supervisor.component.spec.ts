import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosSupervisorComponent } from './datos-supervisor.component';

describe('DatosSupervisorComponent', () => {
  let component: DatosSupervisorComponent;
  let fixture: ComponentFixture<DatosSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosSupervisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
