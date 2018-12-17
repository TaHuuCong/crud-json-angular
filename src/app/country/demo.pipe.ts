import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

const DATE_TIME_FMT = 'hh:mm - dd/MMM/yyyy';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, DATE_TIME_FMT);
  }
}