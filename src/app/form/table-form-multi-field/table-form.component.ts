import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements OnInit {

  manageForm: FormGroup;
  Xs: FormArray;
  Ys: FormArray;
  multiArray = [
    // row 1
    [
      {
        classId: 1,
        classFollowId: 2,
        followLimit: 3
      },
      {
        classId: 1,
        classFollowId: 2,
        followLimit: 3
      },
    ],
    // row 2
    [
      {
        classId: 1,
        classFollowId: 2,
        followLimit: 3
      },
      {
        classId: 1,
        classFollowId: 2,
        followLimit: 3
      },
    ],
    // row 3
    [
      {
        classId: 1,
        classFollowId: 2,
        followLimit: 3
      },
      {
        classId: 1,
        classFollowId: 2,
        followLimit: 3
      },
    ],
    // row 4
    [
      {
        classId: 1,
        classFollowId: 2,
        followLimit: 3
      },
      {
        classId: 1,
        classFollowId: 2,
        followLimit: 3
      },
    ],
  ];
  group = {};
  array = [];
  class = ['1', '2', '3', '4'];
  keys: any;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    for (let x = 1; x <= 4; x++) {
      for (let y = 1; y <= 4; y++) {
        const label = 'field_' + x + y;
        this.array.push(label);
      }
    }
    for (let i = 0; i < this.array.length; i++) {
      this.group[this.array[i]] = ['', Validators.required];
    }
    this.manageForm = this.fb.group(this.group);
    this.keys = Object.keys(this.group);
  }

  onSubmit() {
    console.warn(this.manageForm.value);
  }
}
