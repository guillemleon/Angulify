import {Component} from '@angular/core';
import {User} from './models/user';
import {FormsModule} from '@angular/forms';
import {get, post} from './apikit/apikit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'ANGULIFY';
  public user: User;
  public user_register: User;
  public identity;
  public error;
  public token;

  constructor() {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    this.identity = this.getIdentity();
    this.token = this.getToken();

    console.log("TOKEN")
    console.log(this.token)
    console.log("IDENTITY")
    console.log(this.identity)
  }

  /**
   * GET IDENTITY FROM LOCAL STORAGE
   */
  public getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    return identity;
  }

  /**
   * GET TOKEN FROM LOCAL STORAGE
   */
  public getToken() {
    let token = localStorage.getItem('token');

    return token;
  }

  /**
   * LOGIN SUBMIT
   */
  public onSubmitLogin() {
    let body = {
      email: this.user.email,
      password: this.user.password
    };

    post('/login', (res) => {
      this.identity = res.data.user;
      console.log(this.identity)
      if (!this.identity._id) {
        alert("L'usuari no esta loguejat correctament");
      } else {
        // CREAR ELEMENT EN EL LOCAL STORAGE PER GUARDAR LA SESSIÓ DE L'USUARI
        localStorage.setItem('identity', JSON.stringify(this.identity));

        // RECUPERAR EL TOKEN PER ENVIARLO EN LES PETICIONS HTTP
        body["getHash"] = true;
        post('/login', (res) => {
          this.token = res.data.token;
          if (this.token.length <= 0) {
            alert("El token no s\'ha generat correctament.");
          } else {
            // CREAREM UN ELEMENT EN EL LOCAL STORAGE PER A GUARDAR EL TOKEN
            localStorage.setItem('token', this.token);
            this.user = new User('', '', '', '', '', 'ROLE_USER', '');

          }
        }, (err) => {
          console.log(err)
        }, body);
      }

    }, (err) => {
      console.log(err);
      this.error = err;
    }, body)

  }

  /**
   * REGISTER SUBMIT
   */
  public onSubmitRegister() {
    let body = {
      name: this.user_register.name,
      lastName: this.user_register.lastName,
      email: this.user_register.email,
      password: this.user_register.password
    };

    post('/register', (res) => {
      console.log(res.data.user);
    }, (err) => {
      console.log(err);
    }, body, () => {
      this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
    })

  }

  public onUserUpdate() {
    const token = this.getToken();
    let body;


  }

  /**
   * LOGOUT METHOD. REMOVES IDENTITY FROM LOCAL STORAGE
   */
  public logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

}
