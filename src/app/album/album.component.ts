import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';      // A service that applications can use to interact with a browser's UR
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id: string;
  album: Object;

  constructor(private route: ActivatedRoute,
              private spotify: SpotifyService,
              private location: Location
              ) { 
    route.params.subscribe(params => {this.id = params['id'];});
              }

  ngOnInit(): void {
    this.spotify
      .getAlbum(this.id)
      .subscribe((res: any) => this.renderAlbum(res));  
  }

  back(): void {
    this.location.back();    //Navigates back in the platform's history.
  }

  renderAlbum(res: any): void {
    this.album = res;
    console.log(this.album);
  }

}
