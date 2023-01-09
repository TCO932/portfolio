import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Portfolio, User } from 'src/app/data';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  public id?: string;
  public pics: any[] = [];
  public portfolio?: Portfolio;
  public author?: User;
  public comments?: any[];
  public picSize!: Number;
  constructor(
    private portfoliosService: PortfoliosService,
    private profileService: ProfileService, 
    private route: ActivatedRoute,
    private router: Router,
    ) {
    this.id = String(this.route.snapshot.params['id']);
    this.portfoliosService.getPortfolio(this.id!).subscribe((res) => {
      this.portfolio = res.data;
      if (this.portfolio) {
        console.log(this.portfolio);
        this.author = this.profileService.getUser();
        this.portfoliosService.getComments(this.portfolio?.portfolio_id ?? '').subscribe((res) => {
          this.comments = res.data;
          console.log(this.comments);
        });
        this.portfoliosService.getImages(this.portfolio?.portfolio_id ?? '').subscribe((res) => {
          this.pics = res.data;
          console.log(this.pics);
        });
      } else {
        this.router.navigate(['main']);
      }
    });
  }

  ngOnInit(): void {
    console.log(this.portfolio?.user_id)
    console.log(this.author?.user_id)
  }

  deletePortfolio(id: string) {
    this.portfoliosService.deletePortfolio(id);
    this.router.navigate(['add-portfolio']);
  }

  editPortfolio(id: string) {
    // this.portfoliosService.deletePortfolio(id);
  }
}
