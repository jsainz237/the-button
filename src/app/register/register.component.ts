import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMap: string[] = [

  ]

  constructor(private authService: AuthService) { }
  // /^[a-zA-Z0-9]+$/
  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl('', [
        this.requiredValidator('username is required'),
        this.customPatternCheck(new RegExp(/^[a-zA-Z0-9]+$/), 'username must be alphanumeric')
      ]),
      'password': new FormControl('', [
        this.requiredValidator('password is required'),
        this.lengthValidator(8, "MIN", 'password must be at least 8 characters'),
        this.lengthValidator(64, "MAX", 'password must be less than 64 characters'),
        this.customPatternCheck(new RegExp(/\d/), 'password must contain a number'),
        this.customPatternCheck(new RegExp(/[A-Z]/), 'password must contain a capital letter'),
        this.customPatternCheck(new RegExp(/[a-z]/), 'password must contain a lowercase letter'),
        this.customPatternCheck(new RegExp(/[!?(){}_\\-\\.$#&]/), 'password must contain a special character'),
        this.customPatternCheck(new RegExp(/^((?!')(?!").)*$/), 'password cannot contain \' or \" characters'),
      ]),
      'passwordConfirm': new FormControl('', [])
    }, {
      validators: [ this.matchingPasswordValidator() ]
    })
  }

  // check if required field is filled out
  private requiredValidator(errorMsg: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isValid: boolean = false;
      if(control.value && !control.value.empty) {
        isValid = true;
      }
      return isValid ? null : {'isRequired': errorMsg};
    };
  }

  // check that input is a valid length
  private lengthValidator(length: number, rule: "MIN" | "MAX", errorMsg: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let validLength: boolean;
      if(rule === "MIN") {
        validLength = control.value.length >= length;
      } else {
        validLength = control.value.length <= length
      }
      return validLength ? null : {'InvalidLength': errorMsg};
    };
  }

  // check if input matches a regex pattern
  private customPatternCheck(pattern: RegExp, errorMsg: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validPattern = pattern.test(control.value);
      return validPattern ? null : {'invalidPattern': errorMsg};
    };
  }

  // check if password fields match
  private matchingPasswordValidator(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const pwdControl = formGroup.controls.password;
      const pwdConfControl = formGroup.controls.passwordConfirm;

      pwdControl.value !== pwdConfControl.value ? 
        pwdConfControl.setErrors({ 'matchingPasswordValidator': 'password fields do not match' }) :
        null;

      return null;
    };
  }

  get username() { return this.registerForm.get('username') }
  get password() { return this.registerForm.get('password') }
  get passwordConfirm() { return this.registerForm.get('passwordConfirm') }

  submit() {
    console.log(this.registerForm.get('password').errors)
  }

}
