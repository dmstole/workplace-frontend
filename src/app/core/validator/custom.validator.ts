import { Validators } from '@angular/forms';

export const configureValidator = (required = false, maxLength = 0, minLength = 1, pattern: RegExp = null) => {

    const compose = [];

    if (!!required) {
        compose.push(Validators.required);
    }

    if (maxLength > 0) {
        compose.push(Validators.maxLength(maxLength));
    }

    if (minLength > 0) {
        compose.push(Validators.minLength(minLength));
    }

    if (!!pattern) {
        compose.push(Validators.pattern(pattern));
    }

    return Validators.compose(compose);
}

export class ValidatorPattern {
    static readonly TELEPHONE = /\(\d{2}\)\s\d{4,5}\-\d{4}/g;
    static readonly EMAIL = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$/g;
}