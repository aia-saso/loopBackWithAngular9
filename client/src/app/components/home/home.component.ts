import { NgForm } from '@angular/forms';
import { RecordInterface } from './../../models/records-interface';
import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataApiService: DataApiService) { }
  records: RecordInterface;
  public app_name = "Phone Book";

  ngOnInit(): void {
    this.getListRecords();
  }
  getListRecords(): void {
    this.dataApiService.getAllRecords().subscribe(records => (this.records = records));
  }
  onDeleteRecord(id: number): void {
    if (confirm('Are you sure you want to delete?')) {
      this.dataApiService.deleteRecord(id).subscribe();
    }
  }
  onPreUpdateRecord(record: RecordInterface): void {
    this.dataApiService.selectdRecord = Object.assign({}, record);
  }
  freeForm(recordForm?: NgForm): void {
    this.dataApiService.selectdRecord = {
      id: null,
      name: '',
      phoneNumber: ''
    };

  }

}
