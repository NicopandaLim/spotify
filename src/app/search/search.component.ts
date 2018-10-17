/**
 * The goal here is to render each resulting track side by side on a card
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { SpotifyService } from '../spotify.service';   // import service class

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  results: Object;

  constructor(private spotify: SpotifyService,
              private router: Router,
              private route: ActivatedRoute) { // interface. Contains the information about a route associated with a component loaded in an outlet
    this.route
      .queryParams           // Observable<Params>
      .subscribe(params => {this.query = params['query'] || ''; });  // access ActivatedRoute.queryParams, 'query': route.params[]
              }

  ngOnInit() {                // a hook of component initialization
    this.search();
  }

  search(): void {                              // search by using this.query
    console.log('this.query', this.query);      // because subscribed to the queryParams in the instructor, this.query will always be the most up-to-date.
    if (!this.query) {
      return;
    }

    this.spotify
      .searchTrack(this.query)                               //return searchTrack observable
      .subscribe((res: any) => this.renderResults( res));    //whenever new results emitted, renderResults() is called
  }

    renderResults(res: any): void {
      this.results = null;
      if (res && res.tracks && res.tracks.items){
        this.results = res.tracks.items;
      }
    }

    submit(query: string): void {
      this.router.navigate(['search'], { queryParams: {query: query} }) // ActivatedRoute.navigate() return observable<boolean>
      .then(_ => this.search());

    }

}
