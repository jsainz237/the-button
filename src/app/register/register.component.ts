import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl('', [
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]),
      // 'password': new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(8),
      //   Validators.maxLength(64),
      //   Validators.pattern(/\d/),
      //   Validators.pattern(/[A-Z]/),
      //   Validators.pattern(/[a-z]/),
      //   Validators.pattern(/[!?(){}_\\-\\.$#&]/),
      //   Validators.pattern(/^((?!')(?!").)*$/)
      // ]),
      // 'passwordConfirm': new FormControl('', [
      //   this.matchingPasswordValidator()
      // ])
    })
  }

  private matchingPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      // const passwordsMatch = this.password === this.passwordConfirm;
      const passwordsMatch = false;
      return passwordsMatch ? null : {'matchingPasswordValidator': {value: control.value}};
    };
  }

  get username() { return this.registerForm.get('username') }
  get password() { return this.registerForm.get('username') }
  get passwordConfirm() { return this.registerForm.get('username') }

  submit() {
    //console.log(this.registerForm.get('username'))
  }

}
