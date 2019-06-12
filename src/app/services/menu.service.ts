import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  apiUrl = 'assets/data';

  constructor(public http: HttpClient) {}

  find(searchFilter: any = null): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/menus.json`)
      .pipe(
        map((menus) =>
          menus.filter((menu) => this.filterValue(menu, searchFilter))
        )
      );
  }

  filterValue(menu: any, searchFilter: any): boolean {
    let condition = true;

    Object.keys(searchFilter).forEach((f) => {
      if (typeof searchFilter[f] === 'string') {
        if (menu[f].toLowerCase().indexOf(searchFilter[f].toLowerCase()) < 0) {
          condition = false;
          return;
        }
      }

      if (typeof searchFilter[f] === 'object') {
        if (f === 'price') {
          const { upper, lower } = searchFilter[f];
          if (menu[f] > upper || menu[f] < lower) {
            condition = false;
            return;
          }
        }
      }
    });

    return condition;
  }

  getCaterories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories.json`);
  }

  getTags(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tags.json`);
  }
}
