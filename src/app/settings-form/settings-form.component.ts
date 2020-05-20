import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { customPatternCheck } from '../utils/validators';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { debounceTime, switchMap } from 'rxjs/operators';

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

  constructor(private authService: AuthService) { }

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

  checkDisplayName(name: string): Observable<{ available: boolean } | null> {
    if(name.length !== 0 && this.displayname.valid) {
      return this.authService.checkNameAvailable(name.toLocaleLowerCase());
    }

    return new Observable();
  }

  submit() {
    this.authService.editDisplayname(name);
  }

}
