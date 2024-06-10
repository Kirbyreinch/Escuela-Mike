import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelasSupervisorComponent } from './escuelas-supervisor.component';

describe('EscuelasSupervisorComponent', () => {
  let component: EscuelasSupervisorComponent;
  let fixture: ComponentFixture<EscuelasSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscuelasSupervisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscuelasSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
