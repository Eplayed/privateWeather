import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from "@angular/http";
import { BasicInfoDto } from './basicInfo-dto';
import { NowWeatheDto } from './nowWeather-dto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  currentCity: BasicInfoDto;
  nowWeather: NowWeatheDto;

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    private http: Http) {

  }
  ngOnInit(): void {

    this.getCurrentPosition();

  }
  getCurrentPosition(refresher?) {
    const self = this;
    self.geolocation.getCurrentPosition({ enableHighAccuracy: true}).then((resp) => {
      const lon = resp.coords.longitude;
      const lat = resp.coords.latitude;
      self.getWeather(lon, lat, refresher);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }
  getWeather(lon, lat, refresher?) {
    const self = this;
    this.http.get('https://free-api.heweather.com/v5/now?city=' + lon + ',' + lat + '&key=9bf8625278e7496a9d133c534907fcaf')
      .subscribe(res => {
        if (refresher) {
          refresher.complete();
        }
        const data = res.json().HeWeather5[0];
        self.currentCity = data.basic;
        self.nowWeather = data.now;
        console.log(self.nowWeather)
      });
  }
  doRefresh(refresher) {
    this.getCurrentPosition(refresher);
  }

}
