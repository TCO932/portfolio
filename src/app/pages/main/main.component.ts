import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public portfolios = [
    {
      id: '1',
      name: '1',
      author: 'me'
    },
    {
      id: '1',
      name: '2',
      author: '2me'
    },
    {
      id: '1',
      name: '3',
      author: '3me'
    },
    {
      id: '1',
      name: '1',
      author: 'me'
    },
    {
      id: '1',
      name: '2',
      author: '2me'
    },
    {
      id: '1',
      name: '3',
      author: '3me'
    },
    {
      id: '1',
      name: '1',
      author: 'me'
    },
    {
      id: '1',
      name: '2',
      author: '2me'
    },
    {
      id: '1',
      name: '3',
      author: '3me'
    },
  ]

  constructor(
    private router: Router,

  ) {

  }

  goToDetails(id: string) {
    this.router.navigate([`portfolio/${id}`]);
  }
}
