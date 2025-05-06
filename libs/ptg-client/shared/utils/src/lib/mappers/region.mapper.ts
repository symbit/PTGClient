import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash-es';

@Pipe({
  name: 'region',
})
export class RegionPipe implements PipeTransform {
  transform(region: string): string {
    return regionMapper(region);
  }
}

export function regionMapper(region: string): string {
  switch (region) {
    case 'foreign':
      return 'Zagranica';
    default:
      return capitalize(region);
  }
}
