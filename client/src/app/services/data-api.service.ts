import { RecordInterface } from './../models/records-interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {
records: Observable<any>;
record: Observable<any>;
public selectdRecord: RecordInterface = {
  id: null,
  name: '',
  phoneNumber: ''
}

  constructor(private http: HttpClient) { }
headers : HttpHeaders = new HttpHeaders({
  "Content-Type": "application/json"
})
  getAllRecords() {
    const uri_api = "http://localhost:3000/api/records";
    return this.http.get(uri_api);
  }

  getRecordById(id: string){
    const uri_api = 'http://localhost:3000/api/records/'+id;
    return this.http.get(uri_api);
  }

  getRecordByName(name: string){
    const uri_api = `http://localhost:3000/api/records?filter[where][name]=${name}`;
    return this.http.get(uri_api);
  }

  saveRecord(record: RecordInterface){
    // TODO: not null
    const url_api =`http://localhost:3000/api/records`;
    return this.http.post<RecordInterface>(url_api ,record ,{headers: this.headers}).pipe(map(data => data));
  }

  updateRecord (record){
    const url_api =`http://localhost:3000/api/records`;
    return this.http.put<RecordInterface>(url_api ,record ,{headers: this.headers})
    .pipe(map(data => data));
  }

  deleteRecord (id: number){
        const url_api =`http://localhost:3000/api/records/${id}`;
    return this.http.delete(url_api);
  }
}
