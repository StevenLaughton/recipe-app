import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplier'
})
export class MultiplierPipe implements PipeTransform {

  transform(value: number, multiplier: number): number {
    return value * multiplier;
  }

}
