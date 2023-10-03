import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, share } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  public apiUrl = 'https://my-json-server.typicode.com/ikhwanuddin39/swadarma-duta-data-pretest/';
  public localUrl = 'http://localhost:3000';
  public endpoint = '';

  // required service
  public readonly http = inject(HttpClient);

  // get semua data
  getData(): Observable<any> {
    const url = `${this.localUrl}/${this.endpoint}`;
    return this.http.get(url);
  }

  // get data berdasarkan ID
  getById(id: number): Observable<any> {
    const url = `${this.localUrl}/${this.endpoint}/${id}`;
    return this.http.get(url);
  }

  // Insert data baru
  insert(data: any): Observable<any> {
    const url = `${this.localUrl}/${this.endpoint}`;
    return this.http.post(url, data);
  }

  // Edit data berdasarkan ID
  update(id: number, newData: any): Observable<any> {
    const url = `${this.localUrl}/${this.endpoint}/${id}`;
    return this.http.put(url, newData);
  }

  // Delete data berdasarkan ID
  delete(id: number): Observable<any> {
    const url = `${this.localUrl}/${this.endpoint}/${id}`;
    return this.http.delete(url);
  }

}
