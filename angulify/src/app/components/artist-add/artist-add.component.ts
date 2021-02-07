import { Component, OnInit } from '@angular/core';
import {Artist} from "../../models/artist";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalFunctions} from "../../global/functions";
import {post} from "../../apikit/apikit";

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.scss']
})
export class ArtistAddComponent implements OnInit {

  public title: String;
  public artists: Artist[];
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  private _route: ActivatedRoute;
  private _router: Router;

  constructor() {

    this.title = 'Afegir artista';
    this.identity = GlobalFunctions.getIdentity();
    this.token = GlobalFunctions.getToken();
    this.artist = new Artist('', '', '');

  }

  ngOnInit(): void {
  }

  onSubmit() {
    const body = this.artist;

    post('/artist', (res) => {

      console.log(res.data)

      if(!res.data.artist) {
        console.log('Error en el servidor');
      } else {
        this.artist = res.data.artist;
        this._router.navigate(['/artists']);
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
