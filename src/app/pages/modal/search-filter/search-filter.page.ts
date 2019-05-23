import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss']
})
export class SearchFilterPage implements OnInit {
  @Input() categories = [];
  @Input() tags = [];

  form: any;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
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

  onSubmit() {
    this.modalCtrl.dismiss(this.form.value);
  }
}
