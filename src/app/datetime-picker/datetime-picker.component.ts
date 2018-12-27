import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { FormControl } from '@angular/forms';
import * as moment from 'moment-timezone';
import { DaterangepickerDirective, DaterangepickerComponent } from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {

  constructor(
  ) {
    const x = this.localToUTC(this.today, 8);
    const y = new Date().toISOString();
    const z = moment(x).startOf('day');
    console.log(x);
    console.log(y);
  }

  // ngx-daterangepicker-material package
  localUTC: any;
  singaporeUTC: any;
  today = new Date();
  // control = new FormControl('');

  currentDate = moment();
  locale = {
    format: 'HH:mm - DD/MM/YYYY',
    cancelLabel: 'Cancel', // detault is 'Cancel'
    applyLabel: 'Apply', // detault is 'Apply'
    firstDay: 1 // first day is monday
  };
  list = [];
  timezone = this.getGMT(new Date());
  // moment = moment().format('DD/MM/YYYY');
  // moment = moment('2019-01-01T23:35:01');
  moment = moment().parseZone();
  test = {
    name: '',
    datepicker: {}
  };
  isErr = false;
  error = 'Error';

  @ViewChild(DaterangepickerDirective) pickerDirective: DaterangepickerDirective;
  picker: DaterangepickerComponent;

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

  getGMT(date) {
    const z = date.getTimezoneOffset() / 60;
    return (z < 0) ? ('GMT +' + -z) : ('GMT -' + z);
  }

  // convert a utc time to local time (with format)
  utcToLocal(utcTime, format) {
    const d = new Date(utcTime);      // convert to local
    return moment(d).format(format);  // format local
  }

  // submit() {
  //   if (this.control.startDate === null) {
  //     this.control = moment();
  //   } else {
  //     const val = this.control.startDate;
  //     const c = moment(val).format('HH:mm - DD/MM/YYYY');
  //     this.localUTC = val.toISOString();
  //     const x = this.localToUTC(val._d, '+8');
  //     this.singaporeUTC = x;
  //     this.list.push({
  //       'time': x,
  //     });
  //   }
  // }
  // this.picker.clear();

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
  this.picker = this.pickerDirective.picker;
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

  change(e) {
    if (e && e.startDate !== undefined && e.startDate !== null) {
      const d = new Date(e.startDate).getTime();
      const m = new Date().getTime();
      if (d <= m) {
        this.isErr = true;
      } else {
        this.isErr = false;
      }
    } else {
      this.isErr = false;
    }
  }

  save(f) {
    console.log(f);
  }
}
