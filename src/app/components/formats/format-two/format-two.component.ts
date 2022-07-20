import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-format-two',
  templateUrl: './format-two.component.html',
  styleUrls: ['./format-two.component.scss']
})
export class FormatTwoComponent implements OnInit {

  students: { id: number, name: string }[];

  constructor() { }

  ngOnInit(): void {
    console.log('Dynamic - pehle mai');
  }

}
