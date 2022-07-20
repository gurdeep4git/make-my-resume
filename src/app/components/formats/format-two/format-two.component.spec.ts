import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatTwoComponent } from './format-two.component';

describe('FormatTwoComponent', () => {
  let component: FormatTwoComponent;
  let fixture: ComponentFixture<FormatTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
