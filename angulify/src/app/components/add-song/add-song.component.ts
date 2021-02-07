import { Component, OnInit } from '@angular/core';
import {Artist} from "../../models/artist";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalFunctions} from "../../global/functions";
import {post} from "../../apikit/apikit";
import {Song} from "../../models/song";

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  public title: String;
  public artists: Artist[];
  public song: Song;
  public identity;
  public token;
  public url: string;
  private _route: ActivatedRoute;
  private _router: Router;

  constructor() {

    this.title = 'Afegir cançó';
    this.identity = GlobalFunctions.getIdentity();
    this.token = GlobalFunctions.getToken();
    this.song = new Song(null, '', '', '', '');

  }

  ngOnInit(): void {
  }

  onSubmit() {
    const body = this.song;

    post('/song', (res) => {

      console.log(res.data.song)

      if(!res.data.artist) {
        console.log('Error en el servidor');
      } else {
        this.song = res.data.song;
        console.log('LA CANÇO S\'HA CREAT CORRECTAMENT');
      }

    }, (err) => {
      console.log('Error: ' + err);
    }, body, () => {}, {
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

}
