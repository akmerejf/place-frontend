import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';

import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'updateHeader($event)'
  }
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    // private zone: NgZone
  ) {}

  currentUser: User;
  isScrolled = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 100;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
          this.currentUser = userData;
       
      }
    )
  }

  updateHeader(evt) {
    this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || -50);
    if(this.currPos >= this.changePos ) {
        this.isScrolled = true;
    } else {
        this.isScrolled = false;
    }
  }

}
