import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './shared/interfaces/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController
  ) {
    this.appPages = [
      {
        group: 'Menu',
        itens: [
          {
            title: 'Home',
            // url: '/home-results',
            url: '',
            direct: 'root',
            icon: 'home'
          },
          {
            title: 'About',
            url: '/about',
            direct: 'forward',
            icon: 'information-circle-outline'
          },
          {
            title: 'App Settings',
            url: '/settings',
            direct: 'forward',
            icon: 'cog'
          }
        ]
      },
      {
        group: 'Ajuda',
        itens: [
          {
            title: 'Sobre',
            // url: '/home-results',
            url: '',
            direct: 'root',
            icon: 'information-circle-outline'
          },
          {
            title: 'Contato',
            url: '/about',
            direct: 'forward',
            icon: 'call'
          },
          {
            title: 'Como Funciona',
            url: '/settings',
            direct: 'forward',
            icon: 'albums'
          },
          {
            title: 'Mapa',
            url: '/map',
            direct: 'forward',
            icon: 'locate'
          }
        ]
      }
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform
      .ready()
      .then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      })
      .catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }
}
