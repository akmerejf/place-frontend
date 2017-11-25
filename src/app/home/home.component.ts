import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectListConfig, TagsService, UserService } from '../shared';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService
  ) {}

  public imageSources: string[] = [
     'http://gomighty.com/wp-content/themes/gomighty/lib/goal_images/files/SMusicPianoAntiqueshutterstock_-1920.jpg',
     'https://d1llvcsapfiksz.cloudfront.net/vendors/samplephonics/deep-sax/images/DeepSax_mobile.jpg',
     'http://media-assets-02.thedrum.com/cache/images/thedrum-prod/public-news-tmp-10557-emoji_0--default--268.jpg',
     'https://www.abamet.ru/images/press/haas/press-releases/2013/gaboi-rigoutat.jpg'
  ];
  
  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 5000,
    stopAutoplayMinWidth: 768
  };

  isAuthenticated: boolean;
  listConfig: ProjectListConfig = new ProjectListConfig();
  tags: Array<string> = [];
  tagsLoaded = false;
  placeLogo: String;
  currentList: string = "Vitrine";
  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the project list accordingly
        if (authenticated) {

          switch (this.currentList) {

            case "Eventos":
              this.setListTo('Eventos');
              break;

            case "Fomento":
              this.setListTo('Fomento');
              break;

            case "Network":
              this.setListTo('Network');
              break;
            
            default:
              this.setListTo('Vitrine');
              break;
          }

        } else {
          this.setListTo('Vitrine');
        }
      }
    );

    this.tagsService.getAll()
    .subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
    });
  }
  

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    // if (type === 'Eventos' && !this.isAuthenticated) {
    //   this.router.navigateByUrl('/login');
    //   return;
    // }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }

  
}
