import { Injectable } from '@angular/core';
import { BaseApiService } from '../services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService extends BaseApiService {
  public override endpoint = 'chart';

}
