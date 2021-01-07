import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICrypto } from '../shared/models/crypto';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  baseUrl = environment.baseUrl;
  data: ICrypto[] = [];

  constructor(private http: HttpClient) { }

  getCryptos(){
    // get all cryptos
    return this.http.get<ICrypto[]>(this.baseUrl + 'crypto').pipe(
      map(response => {
        this.data = response;
        return response;
      })
    );
  }
}
