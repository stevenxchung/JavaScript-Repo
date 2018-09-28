import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onClick() {
    let btn = document.getElementById('btn');
    let btnStream$ = fromEvent(btn, 'click');

    btnStream$.subscribe(
      e => {
        console.log('clicked');
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Completed');
      }
    );
  }
}
