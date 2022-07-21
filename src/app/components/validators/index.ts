import { AbstractControl } from "@angular/forms";


export function digitOnlyValidator(control: AbstractControl) {
    const phoneNumber = control.value;

    if (!isNaN(phoneNumber) && control.value.length === 10) {
        return null;
    }
    return {
        phoneNumberInValid: true
    }
}

export function emailValidator(control: AbstractControl) {
    const email = control.value;
    if (email.includes('@')) {
        return null;
    }
    return {
        emailInValid: true
    }
}
