import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-test',
  templateUrl: './advanced-test.component.html',
  styleUrls: ['./advanced-test.component.css']
})
export class AdvancedTestComponent implements OnInit {
  currentDuration: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
