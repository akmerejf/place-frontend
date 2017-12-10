import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {
    // const id: Observable<string> = child.params.map(p => p.id);
  }

}
