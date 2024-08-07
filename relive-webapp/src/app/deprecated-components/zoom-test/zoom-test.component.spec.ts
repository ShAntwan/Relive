import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomTestComponent } from './zoom-test.component';

describe('ZoomTestComponent', () => {
  let component: ZoomTestComponent;
  let fixture: ComponentFixture<ZoomTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoomTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoomTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
