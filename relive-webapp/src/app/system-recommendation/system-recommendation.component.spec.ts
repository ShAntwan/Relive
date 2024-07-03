import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRecommendationComponent } from './system-recommendation.component';

describe('SystemRecommendationComponent', () => {
  let component: SystemRecommendationComponent;
  let fixture: ComponentFixture<SystemRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
