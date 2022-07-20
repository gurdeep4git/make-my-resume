import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-format-one',
  templateUrl: './format-one.component.html',
  styleUrls: ['./format-one.component.scss']
})
export class FormatOneComponent implements OnInit {

  students: { id: number, name: string }[];

  constructor() { }

  ngOnInit(): void {
    console.log(' dynamic - mai chla')
  }

}
