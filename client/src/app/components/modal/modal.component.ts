import { RecordInterface } from './../../models/records-interface';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { error } from 'protractor';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    public dataApiService: DataApiService,
    private location: Location
  ) { }
  ngOnInit() {
  }
  public isNameError = false;
  public isPhoneError = false;
  onSaveRecord(recordForm: NgForm): void {
    if (recordForm.valid) {

      if (recordForm.value.id == null) {
        // NEW
        this.dataApiService.saveRecord(recordForm.value).subscribe(record => location.reload(), error => {
          if (error.status === 500) {
            alert('Sorry .. phonenumber must be unique');
          } else {
            alert(error.message);
          }
        });
      } else {
        // update
        if (recordForm.value.name === '') {
          this.isNameError = true;
        } else {
          if (recordForm.value.phoneNumber == '') {
            this.isPhoneError = true;
          } else {
            this.dataApiService.updateRecord(recordForm.value).subscribe(borecordok => location.reload());
          }
        }
      }
    } else {
      this.isNameError = false;
      this.isPhoneError = false;
    }

  }

}
