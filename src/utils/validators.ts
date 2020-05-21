import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

// check if required field is filled out
export function requiredValidator(errorMsg: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isValid = control.value && !control.value.empty ? true : false;
        return isValid ? null : {'isRequired': errorMsg};
    };
}

// check that input is a valid length
export function lengthValidator(length: number, rule: "MIN" | "MAX", errorMsg: string): ValidatorFn {
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
export function customPatternCheck(pattern: RegExp, errorMsg: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const validPattern = pattern.test(control.value);
        return validPattern ? null : {'invalidPattern': errorMsg};
    };
}

// check if password fields match
export function matchingPasswordValidator(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const pwdControl = formGroup.controls.password;
        const pwdConfControl = formGroup.controls.passwordConfirm;

        pwdControl.value !== pwdConfControl.value ? 
        pwdConfControl.setErrors({ 'matchingPasswordValidator': 'password fields do not match' }) :
        null;

        return null;
    };
}