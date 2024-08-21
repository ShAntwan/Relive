import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeasurmentsComponent } from './add-measurments.component';

describe('AddMeasurmentsComponent', () => {
  let component: AddMeasurmentsComponent;
  let fixture: ComponentFixture<AddMeasurmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMeasurmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeasurmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
