import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash-es';

@Pipe({
  name: 'sector',
})
export class SectorPipe implements PipeTransform {
  transform(sector: string): string {
    return sectorMapper(sector);
  }
}

export function sectorMapper(sector: string): string {
  switch (sector) {
    case 'all':
      return 'Wszystkie';
    default:
      return capitalize(sector);
  }
}
