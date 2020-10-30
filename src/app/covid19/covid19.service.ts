import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IStats } from "../interfaces";

interface IStatsGlobal {
  global: {
    newConfirmed: number,
    totalConfirmed: number,
    newDeaths: number,
    totalDeaths: number
  }
}

interface IStatsCountry {
  country: string,
  countryCode: string,
  newConfirmed: number,
  totalConfirmed: number,
  newDeaths: number,
  totalDeaths: number
}

interface IStatCountries {
  countries: Array<IStatsCountry>;
}


@Injectable({
  providedIn: 'root'
})
export class Covid19Service {
  private countryInfo = [
    { code: "AD", continent: "EU" },
    { code: "AE", continent: "AS" },
    { code: "AF", continent: "AS" },
    { code: "AG", continent: "NA" },
    { code: "AI", continent: "NA" },
    { code: "AL", continent: "EU" },
    { code: "AM", continent: "AS" },
    { code: "AN", continent: "NA" },
    { code: "AO", continent: "AF" },
    { code: "AP", continent: "AS" },
    { code: "AQ", continent: "AN" },
    { code: "AR", continent: "SA" },
    { code: "AS", continent: "OC" },
    { code: "AT", continent: "EU" },
    { code: "AU", continent: "OC" },
    { code: "AW", continent: "NA" },
    { code: "AX", continent: "EU" },
    { code: "AZ", continent: "AS" },
    { code: "BA", continent: "EU" },
    { code: "BB", continent: "NA" },
    { code: "BD", continent: "AS" },
    { code: "BE", continent: "EU" },
    { code: "BF", continent: "AF" },
    { code: "BG", continent: "EU" },
    { code: "BH", continent: "AS" },
    { code: "BI", continent: "AF" },
    { code: "BJ", continent: "AF" },
    { code: "BL", continent: "NA" },
    { code: "BM", continent: "NA" },
    { code: "BN", continent: "AS" },
    { code: "BO", continent: "SA" },
    { code: "BR", continent: "SA" },
    { code: "BS", continent: "NA" },
    { code: "BT", continent: "AS" },
    { code: "BV", continent: "AN" },
    { code: "BW", continent: "AF" },
    { code: "BY", continent: "EU" },
    { code: "BZ", continent: "NA" },
    { code: "CA", continent: "NA" },
    { code: "CC", continent: "AS" },
    { code: "CD", continent: "AF" },
    { code: "CF", continent: "AF" },
    { code: "CG", continent: "AF" },
    { code: "CH", continent: "EU" },
    { code: "CI", continent: "AF" },
    { code: "CK", continent: "OC" },
    { code: "CL", continent: "SA" },
    { code: "CM", continent: "AF" },
    { code: "CN", continent: "AS" },
    { code: "CO", continent: "SA" },
    { code: "CR", continent: "NA" },
    { code: "CU", continent: "NA" },
    { code: "CV", continent: "AF" },
    { code: "CX", continent: "AS" },
    { code: "CY", continent: "AS" },
    { code: "CZ", continent: "EU" },
    { code: "DE", continent: "EU" },
    { code: "DJ", continent: "AF" },
    { code: "DK", continent: "EU" },
    { code: "DM", continent: "NA" },
    { code: "DO", continent: "NA" },
    { code: "DZ", continent: "AF" },
    { code: "EC", continent: "SA" },
    { code: "EE", continent: "EU" },
    { code: "EG", continent: "AF" },
    { code: "EH", continent: "AF" },
    { code: "ER", continent: "AF" },
    { code: "ES", continent: "EU" },
    { code: "ET", continent: "AF" },
    { code: "EU", continent: "EU" },
    { code: "FI", continent: "EU" },
    { code: "FJ", continent: "OC" },
    { code: "FK", continent: "SA" },
    { code: "FM", continent: "OC" },
    { code: "FO", continent: "EU" },
    { code: "FR", continent: "EU" },
    { code: "FX", continent: "EU" },
    { code: "GA", continent: "AF" },
    { code: "GB", continent: "EU" },
    { code: "GD", continent: "NA" },
    { code: "GE", continent: "AS" },
    { code: "GF", continent: "SA" },
    { code: "GG", continent: "EU" },
    { code: "GH", continent: "AF" },
    { code: "GI", continent: "EU" },
    { code: "GL", continent: "NA" },
    { code: "GM", continent: "AF" },
    { code: "GN", continent: "AF" },
    { code: "GP", continent: "NA" },
    { code: "GQ", continent: "AF" },
    { code: "GR", continent: "EU" },
    { code: "GS", continent: "AN" },
    { code: "GT", continent: "NA" },
    { code: "GU", continent: "OC" },
    { code: "GW", continent: "AF" },
    { code: "GY", continent: "SA" },
    { code: "HK", continent: "AS" },
    { code: "HM", continent: "AN" },
    { code: "HN", continent: "NA" },
    { code: "HR", continent: "EU" },
    { code: "HT", continent: "NA" },
    { code: "HU", continent: "EU" },
    { code: "ID", continent: "AS" },
    { code: "IE", continent: "EU" },
    { code: "IL", continent: "AS" },
    { code: "IM", continent: "EU" },
    { code: "IN", continent: "AS" },
    { code: "IO", continent: "AS" },
    { code: "IQ", continent: "AS" },
    { code: "IR", continent: "AS" },
    { code: "IS", continent: "EU" },
    { code: "IT", continent: "EU" },
    { code: "JE", continent: "EU" },
    { code: "JM", continent: "NA" },
    { code: "JO", continent: "AS" },
    { code: "JP", continent: "AS" },
    { code: "KE", continent: "AF" },
    { code: "KG", continent: "AS" },
    { code: "KH", continent: "AS" },
    { code: "KI", continent: "OC" },
    { code: "KM", continent: "AF" },
    { code: "KN", continent: "NA" },
    { code: "KP", continent: "AS" },
    { code: "KR", continent: "AS" },
    { code: "KW", continent: "AS" },
    { code: "KY", continent: "NA" },
    { code: "KZ", continent: "AS" },
    { code: "LA", continent: "AS" },
    { code: "LB", continent: "AS" },
    { code: "LC", continent: "NA" },
    { code: "LI", continent: "EU" },
    { code: "LK", continent: "AS" },
    { code: "LR", continent: "AF" },
    { code: "LS", continent: "AF" },
    { code: "LT", continent: "EU" },
    { code: "LU", continent: "EU" },
    { code: "LV", continent: "EU" },
    { code: "LY", continent: "AF" },
    { code: "MA", continent: "AF" },
    { code: "MC", continent: "EU" },
    { code: "MD", continent: "EU" },
    { code: "ME", continent: "EU" },
    { code: "MF", continent: "NA" },
    { code: "MG", continent: "AF" },
    { code: "MH", continent: "OC" },
    { code: "MK", continent: "EU" },
    { code: "ML", continent: "AF" },
    { code: "MM", continent: "AS" },
    { code: "MN", continent: "AS" },
    { code: "MO", continent: "AS" },
    { code: "MP", continent: "OC" },
    { code: "MQ", continent: "NA" },
    { code: "MR", continent: "AF" },
    { code: "MS", continent: "NA" },
    { code: "MT", continent: "EU" },
    { code: "MU", continent: "AF" },
    { code: "MV", continent: "AS" },
    { code: "MW", continent: "AF" },
    { code: "MX", continent: "NA" },
    { code: "MY", continent: "AS" },
    { code: "MZ", continent: "AF" },
    { code: "NA", continent: "AF" },
    { code: "NC", continent: "OC" },
    { code: "NE", continent: "AF" },
    { code: "NF", continent: "OC" },
    { code: "NG", continent: "AF" },
    { code: "NI", continent: "NA" },
    { code: "NL", continent: "EU" },
    { code: "NO", continent: "EU" },
    { code: "NP", continent: "AS" },
    { code: "NR", continent: "OC" },
    { code: "NU", continent: "OC" },
    { code: "NZ", continent: "OC" },
    { code: "O1", continent: "--" },
    { code: "OM", continent: "AS" },
    { code: "PA", continent: "NA" },
    { code: "PE", continent: "SA" },
    { code: "PF", continent: "OC" },
    { code: "PG", continent: "OC" },
    { code: "PH", continent: "AS" },
    { code: "PK", continent: "AS" },
    { code: "PL", continent: "EU" },
    { code: "PM", continent: "NA" },
    { code: "PN", continent: "OC" },
    { code: "PR", continent: "NA" },
    { code: "PS", continent: "AS" },
    { code: "PT", continent: "EU" },
    { code: "PW", continent: "OC" },
    { code: "PY", continent: "SA" },
    { code: "QA", continent: "AS" },
    { code: "RE", continent: "AF" },
    { code: "RO", continent: "EU" },
    { code: "RS", continent: "EU" },
    { code: "RU", continent: "EU" },
    { code: "RW", continent: "AF" },
    { code: "SA", continent: "AS" },
    { code: "SB", continent: "OC" },
    { code: "SC", continent: "AF" },
    { code: "SD", continent: "AF" },
    { code: "SE", continent: "EU" },
    { code: "SG", continent: "AS" },
    { code: "SH", continent: "AF" },
    { code: "SI", continent: "EU" },
    { code: "SJ", continent: "EU" },
    { code: "SK", continent: "EU" },
    { code: "SL", continent: "AF" },
    { code: "SM", continent: "EU" },
    { code: "SN", continent: "AF" },
    { code: "SO", continent: "AF" },
    { code: "SR", continent: "SA" },
    { code: "ST", continent: "AF" },
    { code: "SV", continent: "NA" },
    { code: "SY", continent: "AS" },
    { code: "SZ", continent: "AF" },
    { code: "TC", continent: "NA" },
    { code: "TD", continent: "AF" },
    { code: "TF", continent: "AN" },
    { code: "TG", continent: "AF" },
    { code: "TH", continent: "AS" },
    { code: "TJ", continent: "AS" },
    { code: "TK", continent: "OC" },
    { code: "TL", continent: "AS" },
    { code: "TM", continent: "AS" },
    { code: "TN", continent: "AF" },
    { code: "TO", continent: "OC" },
    { code: "TR", continent: "EU" },
    { code: "TT", continent: "NA" },
    { code: "TV", continent: "OC" },
    { code: "TW", continent: "AS" },
    { code: "TZ", continent: "AF" },
    { code: "UA", continent: "EU" },
    { code: "UG", continent: "AF" },
    { code: "UM", continent: "OC" },
    { code: "US", continent: "NA" },
    { code: "UY", continent: "SA" },
    { code: "UZ", continent: "AS" },
    { code: "VA", continent: "EU" },
    { code: "VC", continent: "NA" },
    { code: "VE", continent: "SA" },
    { code: "VG", continent: "NA" },
    { code: "VI", continent: "NA" },
    { code: "VN", continent: "AS" },
    { code: "VU", continent: "OC" },
    { code: "WF", continent: "OC" },
    { code: "WS", continent: "OC" },
    { code: "YE", continent: "AS" },
    { code: "YT", continent: "AF" },
    { code: "ZA", continent: "AF" },
    { code: "ZM", continent: "AF" },
    { code: "ZW", continent: "AF" },
  ];


  constructor(private httpClient: HttpClient) { }


  getStats() {
    return this.httpClient
      .get('https://api.covid19api.com/summary')
    //.pipe(map(data => this.transformCountries(data.Countries)));
  }

  transformCountries(data) {
    let a = [];
    data.forEach(element => {
      console.log(element);
      element = this.getContinent(element.code);
      a.push(element);
    });
    console.log(a);
    return a;
  }

  getContinent(code): string {
    this.countryInfo.filter(obj => {
      if (obj.code === code) {
        //console.log(obj.continent);
        //return true;
        return obj.continent;
      }
    })
    return
  }
}
