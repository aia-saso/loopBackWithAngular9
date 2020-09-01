import { RecordInterface } from './../models/records-interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  records: Observable<any>;
  record: Observable<any>;
  errorMsg: string;
  public selectdRecord: RecordInterface = {
    id: null,
    name: '',
    phoneNumber: ''
  }

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })
  getAllRecords() {
    const uri_api = "http://localhost:3000/api/records";
    return this.http.get(uri_api);
  }

  // Record.find({ where: { name: { like: '%St%' } } }, function(err, posts) { });

  getRecordById(id: string) {
    const uri_api = 'http://localhost:3000/api/records/' + id;
    return this.http.get(uri_api);
  }

  getRecordByName(name: string) {
    // const filter = {
    //   "where": {
    //     "title": {
    //       "like": name
    //     }
    //   }
    // };
    const uri_api = `http://localhost:3000/api/records?filter[where][name]=${name}`;
    return this.http.get(uri_api);
  }

  saveRecord(record: RecordInterface) {
    // TODO: not null
    const url_api = `http://localhost:3000/api/records`;

    return this.http.post<RecordInterface>(url_api, record, { headers: this.headers }).pipe(map(data => data,
      catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          this.errorMsg = `Error: ${error.error.message}`;
        } else {
          this.errorMsg = this.getServerErrorMessage(error);
        }

        return throwError(errorMsg);
      })));
  }

  updateRecord(record) {
    const url_api = `http://localhost:3000/api/records`;
    return this.http.put<RecordInterface>(url_api, record, { headers: this.headers })
      .pipe(map(data => data));
  }

  deleteRecord(id: number) {
    const url_api = `http://localhost:3000/api/records/${id}`;
    return this.http.delete(url_api);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
