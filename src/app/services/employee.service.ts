import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {

  }
  apiurl = 'http://localhost:3000/employees';
  RegisterUser(inputData: any) {
    return this.http.post(this.apiurl, inputData);
  }
  Getall() {
    return this.http.get(this.apiurl);
  }
  editEmployee(id:any,inputData:any){
    return this.http.put(this.apiurl+'/'+id,inputData);
  }
  deleteEmployee(id:any){
    return this.http.delete(this.apiurl+'/'+id);
  }
}
