import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss']
})
export class SearchFilterPage implements OnInit {
  public radiusmiles = 1;
  public minmaxprice = {
    upper: 500,
    lower: 10
  };
  organizeby: any;
  dishtype: any;
  dishnationality: any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss('testtttt return');
  }
}
