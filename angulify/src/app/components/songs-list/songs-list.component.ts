import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalFunctions} from "../../global/functions";
import {get} from "../../apikit/apikit";
import {Song} from "../../models/song";

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {

  public title: String;
  public songs: Song[];
  public identity;
  public token;
  public url: string;
  public currSong: string;

  constructor() {

    this.title = 'Cançons';
    this.identity = GlobalFunctions.getIdentity();
    this.token = GlobalFunctions.getToken();
    // this.url = GlobalFunctions.url();
    this.currSong = GlobalFunctions.getCurrentSong();
  }

  ngOnInit(): void {
    // GET SONGS LIST
    this.getSongs();
  }

  private getSongs() {
    get('/songs-list', (res) => {
      console.log(res.data.songs);

      this.songs = res.data.songs;
    }, (err) => {
      console.log(err);
    }, () => {}, {
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

  public playSong(file: string) {

    this.currSong = `http://localhost:3000/api/get-song-file/${file}`;
    localStorage.setItem('currentSong', this.currSong);

    console.log(this.currSong)
    location.reload();

  }

  public addToFav(song: Song) {
    localStorage.setItem('fav', JSON.stringify(song));
  }

}
