import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSupervisorComponent } from './inicio-supervisor.component';

describe('InicioSupervisorComponent', () => {
  let component: InicioSupervisorComponent;
  let fixture: ComponentFixture<InicioSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioSupervisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
