import { OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

export abstract class BaseForm implements OnInit {
  form: FormGroup;

  protected formBuilder: FormBuilder;

  constructor(injector: Injector) {
    this.formBuilder = injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
    this.onInit();
  }

  onInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.submit();
    } else {
      console.log('Formulário inválido');
    }
  }

  abstract submit(): void;

  reset = () => this.form.reset();

  addControl(controlName: string, validators?: any, value?: any) {
    const formControl = new FormControl(value, validators);
    this.form.addControl(controlName, formControl);
    this.form.get(controlName).updateValueAndValidity();
  }

  existControl = (controlName: string) => this.form.contains(controlName);
  hasValueControl = (controlName: string) => this.form.get(controlName).value;

  applyCssError(controlName: string) {
    let cssClass = {};

    if (this.verifyTouched(controlName)) {
      cssClass = {
        'has-error': !this.verifyValid(controlName),
        'has-feedback': !this.verifyValid(controlName)
      };
    }

    cssClass = { ...cssClass, 'field-valid': this.verifyValid(controlName) };

    return cssClass;
  }

  verifyTouched = (controlName: string) => this.form.get(controlName).touched;
  verifyValid = (controlName: string) => this.form.get(controlName).valid;
}
