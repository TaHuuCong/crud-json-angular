import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'formatUtc'})
export class FormatUtcTime implements PipeTransform {
  transform(value: string): string {
    if (value !== null && value !== '') {
        const d = new Date(value);                      // convert to local
        return moment(d).format('HH:mm - DD/MM/YYYY');  // format local
    }
  }
}
