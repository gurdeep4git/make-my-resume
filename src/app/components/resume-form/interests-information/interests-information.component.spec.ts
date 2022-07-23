import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsInformationComponent } from './interests-information.component';

describe('InterestsInformationComponent', () => {
  let component: InterestsInformationComponent;
  let fixture: ComponentFixture<InterestsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestsInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
