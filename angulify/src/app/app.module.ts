import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { AddSongComponent } from './components/add-song/add-song.component';

@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
    NavigationComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    SongsListComponent,
    AddSongComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    EditUserComponent,
    NavigationComponent,
    ArtistListComponent
  ]
})
export class AppModule { }
