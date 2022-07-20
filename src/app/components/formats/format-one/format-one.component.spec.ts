import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatOneComponent } from './format-one.component';

describe('FormatOneComponent', () => {
  let component: FormatOneComponent;
  let fixture: ComponentFixture<FormatOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
