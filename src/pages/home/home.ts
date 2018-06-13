import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Content, AlertController } from 'ionic-angular';
import { MarvelProvider } from '../../providers/marvel/marvel';
import { MarvelApiResponse } from '../../models/MarvelApiResponse';
import { Hero } from '../../models/MarvelHero';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('container') content: Content;

  isLoading: boolean = true;
  noMoreHeroes: boolean = false;

  showScrollTopButton: boolean = false;

  name: string = "";
  heroes: Hero[] = [];

  placeholderImage = "assets/imgs/placeholder-639x639.png";

  page: number = 1;
  limit: number = 5;

  total = 0;

  error: boolean = false;

  constructor(public navCtrl: NavController,
    private marvelProvider: MarvelProvider,
    private zone: NgZone,
    private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.getHeroes(null);
  }

  checkScroll(ev: any) {
    this.zone.run(() => {
      if (this.content.scrollTop >= 51) {
        this.showScrollTopButton = true;
      } else {
        this.showScrollTopButton = false;
      }
    });
  }


  getHeroes(ev: any): void {
    this.page = 1;
    if (ev)
      this.name = ev.target.value;

    if (!this.name)
      this.name = this.getRandomChar();

    this.isLoading = true;
    this.marvelProvider.getHeroesByName(this.name)
      .then((data: MarvelApiResponse) => {

        this.heroes = data.data.results;
        this.isLoading = false;

      }).catch(err => {
        this.error = true;
        this.showAlertError();
        console.log(err);
      });

  }

  doInfinite(infiniteScroll): void {
    this.page += 1;
    this.marvelProvider.getHeroesByName(this.name, this.page, this.limit)
      .then((data: MarvelApiResponse) => {

        if (data.data.results.length == 0) {
          this.noMoreHeroes = true;
        }
        else {
          let results = data.data.results;
          results.forEach(el => {
            this.heroes.push(el);
          });
          infiniteScroll.complete();
        }

      }).catch(err => {
        this.error = true;
        this.showAlertError();
        console.log(err);
      });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  getRandomChar(): string {
    let char: string = "";
    let strings = "abcdefghijklmnopqrstuvwxyz";

    char = strings.charAt(Math.floor(Math.random() * strings.length));

    return char;
  }

  showAlertError() {
    let alert = this.alertCtrl.create({
      title: "Problem finding Heroes",
      message: "Something has happened that we can not get the heroes for you. Please try again",
      buttons: [
        {
          text: "Try Again",
          handler: () => {
            this.getHeroes(null);
          }
        }
      ]
    });

    alert.present();
  }

}
