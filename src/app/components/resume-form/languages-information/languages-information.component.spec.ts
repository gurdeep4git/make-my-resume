import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesInformationComponent } from './languages-information.component';

describe('LanguagesInformationComponent', () => {
  let component: LanguagesInformationComponent;
  let fixture: ComponentFixture<LanguagesInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagesInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
