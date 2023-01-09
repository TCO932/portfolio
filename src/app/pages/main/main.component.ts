import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfoliosService } from 'src/app/services/portfolios.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  // public portfolios = [
  //   {
  //     id: '1',
  //     name: '1',
  //     author: 'me'
  //   },
  //   {
  //     id: '1',
  //     name: '2',
  //     author: '2me'
  //   },
  //   {
  //     id: '1',
  //     name: '3',
  //     author: '3me'
  //   },
  //   {
  //     id: '1',
  //     name: '1',
  //     author: 'me'
  //   },
  //   {
  //     id: '1',
  //     name: '2',
  //     author: '2me'
  //   },
  //   {
  //     id: '1',
  //     name: '3',
  //     author: '3me'
  //   },
  //   {
  //     id: '1',
  //     name: '1',
  //     author: 'me'
  //   },
  //   {
  //     id: '1',
  //     name: '2',
  //     author: '2me'
  //   },
  //   {
  //     id: '1',
  //     name: '3',
  //     author: '3me'
  //   },
  // ];
  public portfolios?: any[];

  constructor(
    private router: Router,
    private portfoliosService: PortfoliosService,
  ) {

  }
  ngOnInit(): void {
    this.portfoliosService.getPortfolios().subscribe(res => {
      if (res.result == 'ok') {
        this.portfolios = res.data;
      }
    });
  }

  goToDetails(id: string) {
    this.router.navigate([`portfolio/${id}`]);
  }
}
