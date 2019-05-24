import { Component, Input, Injector } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { BaseForm } from 'src/app/shared/base/base-form';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss']
})
export class SearchFilterPage extends BaseForm {
  @Input() categories = [];
  @Input() tags = [];

  constructor(private modalCtrl: ModalController, injector: Injector) {
    super(injector);
  }

  onInit() {
    this.form = this.formBuilder.group({
      title: [null],
      category: [null],
      tag: [null],
      price: [
        {
          upper: 500,
          lower: 1
        }
      ]
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  submit(): void {
    this.modalCtrl.dismiss(this.form.value);
  }
}
