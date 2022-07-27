import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormatOneComponent } from '../formats/format-one/format-one.component';
import { FormatTwoComponent } from '../formats/format-two/format-two.component';
import { Resume } from 'src/app/models/resume.model';
import { FormatTypes } from 'src/app/enums/format-type.enum';
import { Router } from '@angular/router';
//@ts-ignore
import html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-resume-preview',
  templateUrl: './resume-preview.component.html',
  styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent implements OnInit, AfterViewInit, AfterViewChecked {

  resume: Resume;
  routerState: any;

  @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetector: ChangeDetectorRef,
    //private location: Location,
    private router: Router
  ) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.routerState = this.router.getCurrentNavigation()?.extras.state;
      if (this.routerState) {
        this.resume = this.routerState.resume
      }
    }

  }

  ngOnInit(): void {
    //@ts-ignore
    //this.resume = this.location.getState();
    this.resume = {
      "personalInformation": {
        "name": "Test",
        "emailId": "Test@test.com",
        "phoneNumber": "7777777777",
        "description": "Highly skilled and results-oriented professional with solid academic preparation holding a Juris Doctor degree and extensive experience in intelligence and special operations seeks position in risk management. Proven ability to assess and manage complex obstacles; viewed as a strong troubleshooter. Successful in intense and demanding environments, providing decisive team leadership and structure with a track record of motivating and developing soldiers. Willing to relocate."
      },
      "educationInformation": [
        {
          "institutionName": "Test",
          "passingYear": "2011"
        },
        {
          "institutionName": "Test",
          "passingYear": "2011"
        }
      ],
      "experienceInformation": {
        "isFresher": false,
        "experiences": [
          {
            "organizationName": "Quovantis",
            "projectName": "PwC",
            "role": "UI Dev",
            "tenureFrom": "2022-07-04T11:38:49.000Z",
            "tenureTo": "2022-07-06T11:38:49.000Z",
            "description": [
              "Test",
              "Test 1"
            ]
          },
          {
            "organizationName": "Quovantis 1",
            "projectName": "PwC",
            "role": "UI Dev",
            "tenureFrom": "2022-07-04T11:38:49.000Z",
            "tenureTo": "2022-07-06T11:38:49.000Z",
            "description": [
              "Test",
              "Test 1"
            ]
          }
        ]
      },
      "certificationsInformation": {
        "isCertified": false,
        "certifications": [
          {
            "title": "IITA",
            "organization": "VDF"
          }
        ]
      },
      "skills": [
        "HTML",
        "CSS"
      ],
      "interests": [
        "Sports",
        "Reading"
      ],
      "formatType": 1
    }
  }

  onEdit() {
    this.router.navigateByUrl(`/form`, {
      state: {
        resume: this.resume
      }
    })
  }

  ngAfterViewInit() {

    let componentFactory: ComponentFactory<any>;

    if (this.resume.formatType === FormatTypes.ONE) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormatOneComponent);
    } else {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormatTwoComponent);
    }

    this.dynamicInsert.clear();
    const dynamicComponent = this.dynamicInsert.createComponent(componentFactory).instance;
    dynamicComponent.resume = this.resume;
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  onDownload() {

    const fileName = this.resume.personalInformation.name;
    const content = document.querySelector('#resumeContainer') as HTMLElement;

    const options = {
      margin: 0.5,
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(options).from(content).save();
  }



}
