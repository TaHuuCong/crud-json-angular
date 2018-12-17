import { Component, OnInit } from '@angular/core';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as setHours from 'date-fns/set_hours';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {

  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);
  placeHolder: 'Date-time';

  range(start: number, end: number): number[] {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today
    return differenceInCalendarDays(current, this.today) < 0;
  }

  disabledDateTime = (): object => {
    return {
      // nzDisabledHours  : () => this.range(0, 24).splice(4, 20),
      // nzDisabledMinutes: () => this.range(30, 60),
      // nzDisabledSeconds: () => [ 55, 56 ]
    };
  }

  constructor() { }

  ngOnInit() {
  }

}
