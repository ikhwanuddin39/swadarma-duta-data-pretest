import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService<T>{
  public apiUrl = 'https://jsonplaceholder.typicode.com';

  public endpoint = '';

  // required service
  public readonly http = inject(HttpClient);
  //  public readonly helpers = inject(HelpersService);

  getData(): Observable<any> {
    // Gunakan query parameter 'limit' dalam URL
    const endpoint = 'posts';
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }

  getById(id: number): Observable<any> {
    const endpoint = `posts/${id}`;
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }
}
