import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateTimeService {
    constructor() { }

    // JAVASCRIPT DATE OBJECTS

    // get current local date & time (return a obj): Thu Dec 27 2018 23:17:30 GMT+0700 (Giờ Đông Dương)
    date = new Date();

    // date formats
    format = [
        'YYYY-MM-DD', 'YYYY-MM', 'YYYY',
        'YYYY-MM-DDTHH:MM:SSZ', 'YYYY-MM-DDT+HH:MM', 'YYYY-MM-DDT-HH:MM'
    ];

    // get time zone hour
    getLocalTimeZone(d: Date) {
        const tz = d.getTimezoneOffset() / 60;
        return (tz <= 0) ? ('+' + -tz) : ('-' + tz);
    }

    // convert local time to another timezone
        // local time: ... 13:00:00 GMT+0700
        // convert to: ... 14:00:00 GMT+0700
        // coi như tương đương với ... 14:00:00 GMT+0700 vì khi covert sang UTC thì cùng 1 giá trị
    localToAnotherTimeZone(d: Date, tz: number) {
        const t = d.getTime() + 60000 * d.getTimezoneOffset() + 3600000 * tz;
        const nd = new Date(t);
        return nd.toISOString();
    }

}
