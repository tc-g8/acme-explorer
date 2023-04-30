import { AbstractControl } from '@angular/forms';

export function validatePresentDate(control: AbstractControl) {
  if (control.value != null && control.value != '') {
    if (isPastDate(control.value)) {
      return { validPresentDate: { value: control.value } };
    } else {
      return null;
    }
  } else if (control.value == null || control.value == 'undefined') {
    return null;
  }
  return null;
}

export function isPastDate(date: any) {
  const timeDifference = new Date(date).getTime() - new Date().getTime();
  return timeDifference <= 0;
}

export function isAWeekBeforeDate(date: any) {
  const timeDifference = new Date(date).getTime() - new Date().getTime();
  return timeDifference <= 604800000;
}
