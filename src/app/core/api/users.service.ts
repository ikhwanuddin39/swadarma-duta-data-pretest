import { Injectable } from '@angular/core';
import { BaseApiService } from '../services/base-api.service';
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: number;
}
@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseApiService {
  public override endpoint = 'users';
}
