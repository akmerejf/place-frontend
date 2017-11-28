import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../../models';
import { ProjectsService, UserService } from '../../services';

@Component({
  selector: 'app-aside-buttons',
  templateUrl: './aside-buttons.component.html',
  styleUrls: ['./aside-buttons.component.css'],
 
})
export class AsideButtonsComponent {
  @Input() btnFace:boolean;
  @Input() btnTwitter:boolean;
  @Input() btnGPlus:boolean;
  @Input() btnInsta:boolean;
  @Input() btnLinkedIn:boolean;
  
  
  repoUrl:string = window.location.href;


}
