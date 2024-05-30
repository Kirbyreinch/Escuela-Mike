import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IyeComponent } from './iye.component';

describe('IyeComponent', () => {
  let component: IyeComponent;
  let fixture: ComponentFixture<IyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IyeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
