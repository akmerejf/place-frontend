import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aside-buttons',
  templateUrl: './aside-buttons.component.html',
  styleUrls: ['./aside-buttons.component.css']
})
export class AsideButtonsComponent implements OnInit {
  @Input() btnFace:boolean;
  @Input() btnTwitter:boolean;
  @Input() btnGPlus:boolean;
  @Input() btnInsta:boolean;
  @Input() btnLinkedIn:boolean;

  constructor() { }

  ngOnInit() {
  }

}
