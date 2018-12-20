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
  localUTC: any;
  singaporeUTC: any;
  today = new Date();
  control = new FormControl('');
  currentDate = moment();
  locale = {
    format: 'HH:mm - DD/MM/YYYY',
    cancelLabel: 'Cancel', // detault is 'Cancel'
    applyLabel: 'Apply', // detault is 'Apply'
    firstDay: 1 // first day is monday
  };

  list = [];

  // ng-zorro-antd package
  // timeDefaultValue = setHours(new Date(), 0);


  // convert local time to another timezone (utc time = GMT+0)
    // local time format: Sat Dec 22 2018 13:00:00 GMT+0700 (Giờ Đông Dương)
    // utc time format: 2018-12-26T18:00:00.000Z
    // GMT+0700 --> zone = '+7.00'
  localToUTC(date, zone) {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (zone * 3600000));
    return nd.toISOString(); // convert to utc
  }

  // convert a utc time to local time (with format)
  utcToLocal(utcTime, format) {
    const d = new Date(utcTime);      // convert to local
    return moment(d).format(format);  // format local
  }

  setTime() {
    const val = this.control.value.startDate;
    const c = moment(val).format('HH:mm - DD/MM/YYYY');
    this.localUTC = c + ' = ' + val.toISOString();
    const x = this.localToUTC(val._d, '+8');
    this.singaporeUTC = this.utcToLocal(x, 'HH:mm - DD/MM/YYYY');
    this.list.push(
      {
        'time': x
      }
    );
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
