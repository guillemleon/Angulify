import { Component } from '@angular/core';
import { User } from './models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'ANGULIFY';
  public user: User;
  public identity;
  public token;

  constructor() {
    this.user = new User('','','','','','ROLE_USER','');
  }

  public onSubmit() {
    console.log(this.user);
  }  

}
