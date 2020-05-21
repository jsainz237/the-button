import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { requiredValidator, customPatternCheck, 
  lengthValidator, matchingPasswordValidator 
} from '../../utils/validators';
import { Subscription, Observable, concat } from 'rxjs';
import { debounceTime, switchMap, take, startWith, first, skip } from 'rxjs/operators';
import { setUser } from 'src/state/user/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  showUsernameCheckmark: boolean = false;
  
  _changesSub: Subscription;
  _usernameAvailableSub: Subscription;

  serverErrors: string[];
  success: boolean = false;

  constructor(
    private authService: AuthService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.configureForm();

    this._changesSub = this.username.valueChanges.subscribe(() => this.showUsernameCheckmark = false);

    this._usernameAvailableSub = this.username.valueChanges.pipe(
      debounceTime(1000), // wait until username stops changing for 1 second
      switchMap((name: string) => this.getUsernameAvailability(name))
    ).subscribe((res: { available: boolean}) => {
      !res.available ?
        this.username.setErrors({ taken: 'username is already taken' }) :
        this.showUsernameCheckmark = true;
        //console.log(true);
    });
  }

  ngOnDestroy() {
    this._changesSub.unsubscribe();
    this._usernameAvailableSub.unsubscribe();
  }

  get username() { return this.registerForm.get('username') }
  get password() { return this.registerForm.get('password') }
  get passwordConfirm() { return this.registerForm.get('passwordConfirm') }

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

  /** trigger observable to check username availability from authService */
  getUsernameAvailability(name: string): Observable<any> {
    if(name.length !== 0 && this.username.valid) {
      // return this.authService.checkUsernameAvailability(name.toLocaleLowerCase())
    }

    return new Observable();
  }

  /** Whether to show Error icon on input field */
  showError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  /** Determines if form submit button is disabled */
  submitDisabled(): boolean {
    return !this.showUsernameCheckmark || this.username.invalid || this.password.invalid || this.passwordConfirm.invalid;
  }

  submit() {
    // this.authService.register(this.username.value, this.password.value)
    //   .subscribe(({ success, id, errors }) => {
    //     if(success) {
    //       this.success = success
    //       this.store.dispatch(setUser({ username: this.username.value, id: id }));
    //     }
    //     else {
    //       console.log(errors)
    //     }
    //   });
  }

}
