import { Component, OnInit } from '@angular/core';
import {Artist} from "../../models/artist";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalFunctions} from "../../global/functions";
import {delete_call, get, post, put} from "../../apikit/apikit";

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.scss']
})
export class ArtistEditComponent implements OnInit {

  public title: String;
  public artists: Artist[];
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  private route: ActivatedRoute;
  private _router: Router;
  public is_edit;

  constructor() {

    this.title = 'Modificar artista';
    this.identity = GlobalFunctions.getIdentity();
    this.token = GlobalFunctions.getToken();
    this.artist = new Artist('', '', '');
    this.is_edit = true;
    this.route = new ActivatedRoute();

  }

  ngOnInit(): void {
    // RECUPERAR UN ARTISTA SEGONS EL SEU ID
    this.route.params.forEach((params) => {
      let id = params['id'];
      console.log(params)
      this.getArtist(id);
    })
  }

  public getArtists(page) {
    get(`/artists/${page}`, (res) => {
      console.log(res.data);
    }, (err) => {
      console.log('Error: ' + err);
    }, () => {}, {
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

  public getArtist(id: string) {
    get(`/artist/${id}`, (res) => {
      console.log(res.data);

      if(!res.data.artist) {
        this._router.navigate(['/']);
      } else {
        this.artist = res.data.artist;
      }

    }, (err) => {
      console.log('Error: ' + err);
    }, () => {}, {
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

  public editArtist(id: string) {
    const body = this.artist;

    put(`/artist/${id}`, (res) => {

      console.log(res.data)

      if(!res.data.artist) {
        console.log('Error en el servidor');
      } else {
        this.artist = res.data.artist;
        //this._router.navigate(['/edit-artist'], res.data.artist._id);
        console.log('L\'ARTISTA S\'HA MODIFICAT CORRECTAMENT');
      }

    }, (err) => {
      console.log('Error: ' + err);
    }, body, () => {}, {
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

  public deleteArtist(id: string) {
    delete_call(`/artist/${id}`, (res) => {
      console.log(res.data);
    }, (err) => {
      console.log('Error: ' + err);
    }, () => {}, {
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

  onSubmit() {
    const body = this.artist;

    post('/artist', (res) => {

      console.log(res.data)

      if(!res.data.artist) {
        console.log('Error en el servidor');
      } else {
        this.artist = res.data.artist;
        this._router.navigate(['/artist-edit'], res.data.artist._id);
        console.log('L\'ARTISTA S\'HA CREAT CORRECTAMENT');
      }

    }, (err) => {
      console.log('Error: ' + err);
    }, body, () => {}, {
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

}
