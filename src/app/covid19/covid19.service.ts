import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor(private httpClient: HttpClient) { }


  getStats() {
    return this.httpClient
      .get('https://api.covid19api.com/summary');
  }
}
