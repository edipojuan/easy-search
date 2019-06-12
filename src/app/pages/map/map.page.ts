import { Component, OnInit } from '@angular/core';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit {
  map;

  constructor() {}

  ngOnInit() {
    this.detectBrowser();
    this.loadMap();
  }

  loadMap() {
    console.log(`Google Maps API version: ${google.maps.version}`);

    const latLng = new google.maps.LatLng(-15.553609, -56.096618);

    // -15.553609, -56.096618

    const mapOptions = {
      center: latLng,
      // zoom: 13,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // mapTypeId: 'satellite',
      // mapTypeId: 'terrain',
      heading: 90,
      tilt: 45
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    this.setCurrentPosition();

    this.addMarkers();

    // this.autoRotate();
  }

  detectBrowser() {
    const useragent = navigator.userAgent;
    const mapdiv = document.getElementById('map');

    if (
      useragent.indexOf('iPhone') !== -1 ||
      useragent.indexOf('Android') !== -1
    ) {
      mapdiv.style.width = '100%';
      mapdiv.style.height = '100%';
    } else {
      mapdiv.style.width = '600px';
      mapdiv.style.height = '800px';
    }
  }

  autoRotate() {
    let heading = 90;

    // Determine if we're showing aerial imagery.
    if (this.map.getTilt() !== 0) {
      window.setInterval(() => {
        heading = heading === 0 ? 90 : 0; // this.map.getHeading() || 0;
        this.map.setHeading(heading + 90);
      }, 3000);
    }
  }

  addMarkers() {
    const positions = [
      new google.maps.LatLng(-15.568601, -56.094145) /* despraiado */,
      new google.maps.LatLng(-15.568642, -56.057323) /* moradaDoOuro */
    ];

    const map = this.map;

    const markers = positions.map((position, i) => {
      return new google.maps.Marker({ position, map, label: `Test ${i}` });
    });
  }

  setCurrentPosition() {
    const infoWindow = new google.maps.InfoWindow();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(this.map);
          this.map.setCenter(pos);
        },
        () => this.handleLocationError(true, infoWindow, this.map.getCenter())
      );
    } else {
      this.handleLocationError(false, infoWindow, this.map.getCenter());
    }
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation.'
    );
    infoWindow.open(this.map);
  }
}
