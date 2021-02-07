import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {GlobalFunctions} from "../../global/functions";
import {put} from "../../apikit/apikit";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public title;
  public user: User;
  public identity;
  public token;

  constructor() {

    this.title = 'Modifica les teves dades';
    this.identity = GlobalFunctions.getIdentity();
    this.token = GlobalFunctions.getToken();
    this.user = this.identity;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.user);

    const body = this.user;

    put(`/update-user/${this.identity._id}`, (res) => {
      if(!res.data.user) {
        console.log('Error: L\'usuari no s\'ha actualitzat.');
      } else {
        localStorage.setItem('identity', JSON.stringify(this.user));
        console.log('DADES ACTUALITZADES CORRECTAMENT');
      }
    }, (err) => {
      console.log('Error: ' + err.toString());
    }, body)
  }

}
