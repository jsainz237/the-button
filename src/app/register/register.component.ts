import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { requiredValidator, customPatternCheck, 
  lengthValidator, matchingPasswordValidator 
} from '../utils/validators';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  usernameAvailable: boolean;
  
  _usernameAvailableSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.configureForm();

    this._usernameAvailableSub = this.username.valueChanges.pipe(
      debounceTime(1000), // wait until username stops changing for 1 second
      switchMap((name: string) => name.length !== 0 && this.username.valid ? // after response from valueChanges comes back (switchMap)
        this.authService.checkUsernameAvailability(name.toLowerCase()) :     // get Aavailability subscription with response
        new Observable())
    ).subscribe((res: { available: boolean}) => console.log(res.available));
  }

  ngOnDestroy() {
    this._usernameAvailableSub.unsubscribe();
  }

  /** configure form, controls, and validators */
  configureForm() {
    this.registerForm = new FormGroup({
      'username': new FormControl('', [
        requiredValidator('username is required'),
        customPatternCheck(new RegExp(/^[a-zA-Z0-9]+$/), 'username must be alphanumeric')
      ]),
      'password': new FormControl('', [
        requiredValidator('password is required'),
        lengthValidator(8, "MIN", 'password must be at least 8 characters'),
        lengthValidator(64, "MAX", 'password must be less than 64 characters'),
        customPatternCheck(new RegExp(/\d/), 'password must contain a number'),
        customPatternCheck(new RegExp(/[A-Z]/), 'password must contain a capital letter'),
        customPatternCheck(new RegExp(/[a-z]/), 'password must contain a lowercase letter'),
        customPatternCheck(new RegExp(/[!?(){}_\\-\\.$#&]/), 'password must contain a special character'),
        customPatternCheck(new RegExp(/^((?!')(?!").)*$/), 'password cannot contain \' or \" characters'),
      ]),
      'passwordConfirm': new FormControl('', [])
    }, {
      validators: [ matchingPasswordValidator() ]
    })
  }

  get username() { return this.registerForm.get('username') }
  get password() { return this.registerForm.get('password') }
  get passwordConfirm() { return this.registerForm.get('passwordConfirm') }

  /** Whether to show Error icon on input field */
  showError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  /** Determines if form submit button is disabled */
  submitDisabled(): boolean {
    return this.username.invalid || this.password.invalid || this.passwordConfirm.invalid;
  }

  submit() {
    console.log("SUBMITTED");
  }

}
