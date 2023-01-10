import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfoliosService } from 'src/app/services/portfolios.service';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.scss']
})
export class AddPortfolioComponent {
  public portfolioForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });
  public reader = new FileReader();
  public files: File[] = [];
  public file?: File;
  public pics: any[] = [];
  public titlePic: any;

  constructor(
    private router: Router,
    private portfoliosService: PortfoliosService,
  ) {
    
  }

  addTitlePic(event: any) {
    this.file = event.target.files[0];
    this.reader.readAsDataURL(event.target.files[0]);
		this.reader.onload = (_event) => {
      this.titlePic = {url: this.reader.result};
		}
  }

  addPics(event: any) {
    this.files.push(event.target.files[0]);
    this.reader.readAsDataURL(event.target.files[0]);
		this.reader.onload = (_event) => {
      const index = this.pics.length;
      this.pics.push({url: this.reader.result, index: index});
		}
  }

  deleteTitle() {
    this.file = undefined;
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.pics.splice(index, 1);
  }

  save() {
    const controls = this.portfolioForm.controls;
    this.portfoliosService.addPortfolio(controls.name.value!, controls.description.value!, (new Date()).toString(), this.file!, this.files).subscribe(
      (res: any) => {
        if (res.body.result == 'ok') {
          this.router.navigate([`portfolio/${res.body.data}`]);
        }
      }
    )
  }
}
