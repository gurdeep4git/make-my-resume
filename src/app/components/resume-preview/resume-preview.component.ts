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
  formatTypes = FormatTypes;

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
    this.resume = {
      "personalInformation": {
        "name": "John Doe",
        "emailId": "john.doe@gmail.com",
        "phoneNumber": "9845872541",
        "description": "Strong in design and integration with intuitive problem-solving skills. Proficient in JAVA, C#, PYTHON, JAVASCRIPT, and SQL. Passionate about implementing and launching new projects. Ability to translate business requirements into technical solutions. Looking to start the career as an entry-level software engineer with a reputed firm driven by technology."
      },
      "educationInformation": [
        {
          "courseName": "Master of science",
          "institutionName": "Devine University",
          "passingYear": "1998"
        },
        {
          "courseName": "Bachelor of science",
          "institutionName": "Greens University",
          "passingYear": "1995"
        }
      ],
      "experienceInformation": {
        "isFresher": false,
        "experiences": [
          {
            "organizationName": "NeoSoft Technologies",
            "projectName": "Alpha",
            "role": "UI Dev",
            "tenureFrom": "2017-11-01T09:12:30.000Z",
            "tenureTo": "2020-08-12T09:12:30.000Z",
            "isCurrentlyWorking": false,
            "description": [
              "Make UI of the application",
              "Make re-usable components",
              "Help other team mates",
              "Writing and implementing efficient code",
              "Identifying areas for modification in existing programs and subsequently developing these modifications",
              "Maintaining and upgrading existing systems"
            ]
          }
        ]
      },
      "certificationsInformation": {
        "notCertified": false,
        "certifications": [
          {
            "title": "CSS",
            "organization": "Udemy"
          },
          {
            "title": "Javascript",
            "organization": "Geeks"
          }
        ]
      },
      "skills": [
        "Skill 1",
        "Skill 2",
        "Skill 3",

      ],
      "interests": [
        "Games",
        "Music",
        "Youtube"
      ],
      "languages": [
        "Hindi",
        "English",
        "Punjabi"
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
      margin: this.resume.formatType === FormatTypes.ONE ? 0.5 : 0,
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(options).from(content).save();
  }



}
