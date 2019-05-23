import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  apiUrl = 'assets/data/menus.json';

  constructor(public http: HttpClient) {}

  find(searchFilter: any = null): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((menus) =>
        menus.filter((menu) => this.filterValue(menu, searchFilter))
      ),
      tap((menus) => console.log(menus))
    );
  }

  filterValue(menu: any, searchFilter: any): boolean {
    let condition = true;

    Object.keys(searchFilter).forEach((f) => {
      if (menu[f].indexOf(searchFilter[f]) < 0) {
        condition = false;
        return;
      }
    });

    return condition;
  }
}
