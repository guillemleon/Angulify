import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Artist } from '../../models/Artist';
import {GlobalFunctions} from "../../global/functions";
import {get} from "../../apikit/apikit";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  public title: String;
  public artists: Artist[];
  public identity;
  public token;
  public url: string;
  private _route: ActivatedRoute;
  private _router: Router;

  constructor() {

    this.title = 'Artistes';
    this.identity = GlobalFunctions.getIdentity();
    this.token = GlobalFunctions.getToken();
    // this.url = GlobalFunctions.url();

  }

  ngOnInit(): void {
    console.log('artist list component cargado');
    // GET ARTIST LIST
    this.getArtists();
  }

  public getArtists() {
    get('/artists-list', (res) => {
      console.log(res.data.artists);

      this.artists = res.data.artists;
    }, (err) => {
      console.log('Error: ' + err);
    }, () => {}, {
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

}
