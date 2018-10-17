import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {SpotifyService} from '../spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: Object;

  constructor(private route: ActivatedRoute, 
              private spotify: SpotifyService,
              private location: Location) {
    route.params.subscribe(params => { this.id = params['id']; }); // to use route params, route.params is an observable<>
                                                                   // extract the value of the param into a hard value by using .subscribe
                                                                   // assign the value of params['id'] to the id instance var on the component
               }

  ngOnInit(): void {
    this.spotify
      .getArtist(this.id)
      .subscribe((res: any) => this.renderArtist(res));
  }

  back(): void {
    this.location.back();
  }

  renderArtist(res: any): void {
    this.artist = res;
  }

}
