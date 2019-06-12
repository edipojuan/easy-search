import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from '@ionic/angular';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
import { ItemDetailsPage } from './../modal/item-details/item-details.page';

// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';

import { MenuService } from './../../services/menu.service';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit {
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

  results = [];
  timeout;

  categories = [];
  tags = [];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.find();

    this.getCategories();
    this.getTags();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  onSearchChange(searchKey: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.find({ title: searchKey }), 400);
  }

  find(searchFilter: any = {}) {
    this.menuService
      .find(searchFilter)
      .subscribe(
        (response) => (this.results = response),
        (err) => console.log(err)
      );
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage,
      componentProps: { categories: this.categories, tags: this.tags }
    });

    modal.onDidDismiss().then((result) => {
      const { data } = result;

      if (!data) {
        return;
      }

      let filters = {};

      Object.keys(data).forEach((param) => {
        if (data[param]) {
          filters = { ...filters, [param]: data[param] };
        }
      });

      this.find(filters);
    });

    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async presentItem(item: any) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailsPage,
      componentProps: { information: item }
    });
    return await modal.present();
  }

  async notifications(ev?: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  getCategories() {
    this.menuService
      .getCaterories()
      .subscribe(
        (response) => (this.categories = response),
        (err) => console.log(err)
      );
  }

  getTags() {
    this.menuService
      .getTags()
      .subscribe(
        (response) => (this.tags = response),
        (err) => console.log(err)
      );
  }
}
