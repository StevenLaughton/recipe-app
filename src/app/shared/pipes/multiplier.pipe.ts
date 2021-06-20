import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplier',
})
export class MultiplierPipe implements PipeTransform {
  transform(value: number, multiplier: number | null): number {
    return value * (multiplier ?? 1);
  }
}
