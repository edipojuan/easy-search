import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import menus from './mocks/menus.mock';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() {}

  find(filter: any = null) {
    return filter ? this.findCondition(filter) : of(menus);
  }

  findCondition(filter: any) {
    return of(
      menus.filter((menu) => {
        let condition = true;

        Object.keys(filter).forEach((f) => {
          if (menu[f].indexOf(filter[f]) < 0) {
            condition = false;
            return;
          }
        });

        return condition;
      })
    );
  }
}
