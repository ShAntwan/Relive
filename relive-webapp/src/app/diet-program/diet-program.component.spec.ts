import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietProgramComponent } from './diet-program.component';

describe('DietProgramComponent', () => {
  let component: DietProgramComponent;
  let fixture: ComponentFixture<DietProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DietProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
