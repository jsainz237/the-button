import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { customPatternCheck } from '../utils/validators';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from 'src/models/user';
import { updateUserDisplayname } from 'src/state/user/user.actions';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  showCheckmark: boolean = false;

  _changesSub: Subscription;
  _nameAvailableSub: Subscription;

  get displayname() { return this.settingsForm.get('displayname') }

  constructor(
    private authService: AuthService,
    private store: Store<{ user: User }>
  ) { }

  ngOnInit(): void {
    this.configureForm();

    this._changesSub = this.displayname.valueChanges.subscribe(() => this.showCheckmark = false)

    this._nameAvailableSub = this.displayname.valueChanges.pipe(
      debounceTime(1000),
      switchMap((name: string) => this.checkDisplayName(name))
    ).subscribe(res => {
      !res.available ?
        this.displayname.setErrors({ taken: 'display name not available' }) :
        this.showCheckmark = true;
    })
  }

  ngOnDestroy(): void {
    this._changesSub.unsubscribe();
    this._nameAvailableSub.unsubscribe();
  }

  /** Configure Form Group and Controls */
  configureForm() {
    this.settingsForm = new FormGroup({
      'displayname': new FormControl('', [
        customPatternCheck(new RegExp(/^[a-zA-Z0-9]+$/), 'username must be alphanumeric')
      ])
    })
  }

  /** Whether to show Error icon on input field */
  showError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  /** Make GET request to check if display name is available */
  checkDisplayName(name: string): Observable<{ available: boolean } | null> {
    if(name.length !== 0 && this.displayname.valid) {
      return this.authService.checkNameAvailable(name.toLocaleLowerCase());
    }

    return new Observable();
  }

  /** Make POST request to API to change user's displayname */
  submitDisplayNameEdit() {
    if(this.displayname.valid && this.showCheckmark)
      this.authService.editDisplayname(this.displayname.value)
        .subscribe(({ displayname }) => {
          this.store.dispatch(updateUserDisplayname({ displayname }))
          this.displayname.setValue('');
        });
  }

}
