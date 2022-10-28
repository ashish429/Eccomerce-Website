import { Product } from './../../product';
import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  id!: number;
  query!: string;
  product: any = [];
  @Output()
  private unsubscriber: Subject<void> = new Subject<void>();
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.params['query'];
    this.api.searchedProduct(this.query).subscribe((data) => {
      this.product = data;
      console.log(this.product);
    });
    history.pushState(null, '');

    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((_) => {
        history.pushState(null, '');
      });
  }
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
