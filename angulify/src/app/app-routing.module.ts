import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {ArtistListComponent} from "./components/artist-list/artist-list.component";
import {ArtistAddComponent} from "./components/artist-add/artist-add.component";
import {ArtistEditComponent} from "./components/artist-edit/artist-edit.component";
import {SongsListComponent} from "./components/songs-list/songs-list.component";
import {AddSongComponent} from "./components/add-song/add-song.component";

const routes: Routes = [
  {path: '', redirectTo: '/artists/1', pathMatch: 'full'},
  {path: '', component: EditUserComponent},
  {path: 'profile', component: EditUserComponent},
  {path: 'artists', component: ArtistListComponent},
  {path: 'artist-add', component: ArtistAddComponent},
  {path: 'artist-edit/:id', component: ArtistEditComponent},
  {path: 'songs', component: SongsListComponent},
  {path: 'song-add', component: AddSongComponent},
  {path: '**', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
