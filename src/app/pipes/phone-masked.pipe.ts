import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMasked'
})
export class PhoneMaskedPipe implements PipeTransform {

  transform(value: string): string {
    return `${value.substring(0, 4)}-${value.substring(4, 7)}-${value.substring(7, 10)}`
  }

}
