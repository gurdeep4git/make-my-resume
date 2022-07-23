import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationsInformationComponent } from './certifications-information.component';

describe('CertificationsInformationComponent', () => {
  let component: CertificationsInformationComponent;
  let fixture: ComponentFixture<CertificationsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificationsInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
