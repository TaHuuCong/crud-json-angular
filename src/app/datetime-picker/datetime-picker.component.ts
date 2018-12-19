import { Component, OnInit } from '@angular/core';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as setHours from 'date-fns/set_hours';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {

  constructor() { }

  // ngx-daterangepicker-material package
  value: any;
  dateMaterial = new FormControl('');
  currentDate = moment();
  locale = {
    format: 'HH:mm - DD/MM/YYYY',
    cancelLabel: 'Cancel', // detault is 'Cancel'
    applyLabel: 'Okay', // detault is 'Apply'
    firstDay: 1 // first day is monday
  };

  // ng-zorro-antd package
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  setTime() {
    this.value = this.dateMaterial.value.startDate.toISOString();
  }

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

  ngOnInit() {
  }

  // options: any = {
  //   autoApply: false,
  //   alwaysShowCalendars: false,
  //   showCancel: false,
  //   showClearButton: false,
  //   linkedCalendars: true,
  //   singleDatePicker: true,
  // };
  // minDate: moment.Moment = moment();
  // locale: any = {
  //   format: 'HH:mm - DD/MMMM/YYYY',
  //   separator: ' To ',
  //   cancelLabel: 'Cancel',
  //   applyLabel: 'Okay',
  // };
  // opens: string;
  // drops: string;
  // timePicker: boolean;
  // selected = { start: moment().subtract(3, 'days'), end: moment().add(3, 'days') };
  // click() {
  // }

  // ngOnInit() {
  // }

}
