import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, share } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  public apiUrl = 'https://jsonplaceholder.typicode.com';

  public endpoint = '';

  // required service
  public readonly http = inject(HttpClient);

  // get semua data
  getData(): Observable<any> {
    const url = `${this.apiUrl}/${this.endpoint}`;
    return this.http.get(url);
  }

  // get data berdasarkan ID
  getById(id: number): Observable<any> {
    const endpoint = `posts/${id}`;
    const url = `${this.apiUrl}/${this.endpoint}/${id}`;
    return this.http.get(url);
  }

  // Insert data baru
  insert(data: any): Observable<any> {
    const url = `${this.apiUrl}/${this.endpoint}`;
    return this.http.post(url, data);
  }

  // Edit data berdasarkan ID
  update(id: number, newData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.endpoint}/${id}`;
    return this.http.put(url, newData);
  }

  // Delete data berdasarkan ID
  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${this.endpoint}/${id}`;
    return this.http.delete(url);
  }

}
