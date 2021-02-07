import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GlobalFunctions} from "../../global/functions";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Output() logoutEvent = new EventEmitter();
  public title;
  public identity;
  public token;

  constructor() {

    this.title = 'ANGULIFY';
    this.identity = GlobalFunctions.getIdentity();
    this.identity = GlobalFunctions.getToken();

  }

  ngOnInit(): void {

  }

  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.logoutEvent.emit(null);
  }

}
