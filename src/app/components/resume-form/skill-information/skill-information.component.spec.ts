import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillInformationComponent } from './skill-information.component';

describe('SkillInformationComponent', () => {
  let component: SkillInformationComponent;
  let fixture: ComponentFixture<SkillInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
