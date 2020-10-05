import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  countries;
  global;
  receivedData;
  sortCasesCumulativeDesc = false;
  sortNewCasesDesc = false;
  sortDeathsTotalDesc = false;
  sortNewDeathsDesc = false;
  sortBy: string;
  nameSortAsc = false;

  constructor(private http: HttpClient) {
    // let params = new HttpParams().set('userId', '1');
    this.http
      .get('https://api.covid19api.com/summary')
      .subscribe((value: any) => {
        this.countries = value.Countries;
        this.global = value.Global;
        this.receivedData = value.Countries;
        this.toggleCasesCumulative();
      });
  }

  updateCountry(event) {
    if (event == 'all') {
      this.countries = this.receivedData;
    } else {
      this.countries = this.receivedData.filter((c) => {
        // tslint:disable-next-line: no-string-literal
        return c['Country'] == event.Country;
      });
    }
  }

  toggleSort(columnName) {
    if (columnName == 'name') {
      this.toggleNames();
    } else if (columnName == 'casesTotal') {
      this.toggleCasesCumulative();
    } else if (columnName == 'casesNew') {
      this.toggleCasesNew();
    } else if (columnName == 'deathsTotal') {
      this.toggleDeathsCumulative();
    } else {
      this.toggleDeathsNew();
    }
  }

  toggleDeathsNew() {
    this.sortBy = 'newDeaths';
    this.nameSortAsc = false;
    this.sortCasesCumulativeDesc = false;
    this.sortDeathsTotalDesc = false;
    this.sortNewCasesDesc = false;

    if (!this.sortNewDeathsDesc) {
      this.sortNewDeathsDesc = !this.sortNewDeathsDesc;
      this.countries.sort((a, b) => {
        return b.NewDeaths - a.NewDeaths;
      });
    } else {
      this.sortNewDeathsDesc = !this.sortNewDeathsDesc;
      this.countries.sort((a, b) => {
        return a.NewDeaths - b.NewDeaths;
      });
    }
  }


  toggleDeathsCumulative() {
    this.sortBy = 'deathsTotal';
    this.nameSortAsc = false;
    this.sortNewCasesDesc = false;
    this.sortCasesCumulativeDesc = false;
    this.sortNewDeathsDesc = false;
    if (!this.sortDeathsTotalDesc) {
      this.sortDeathsTotalDesc = !this.sortDeathsTotalDesc;
      this.countries.sort((a, b) => {
        return b.TotalDeaths - a.TotalDeaths;
      });
    } else {
      this.sortDeathsTotalDesc = !this.sortDeathsTotalDesc;
      this.countries.sort((a, b) => {
        return a.TotalDeaths - b.TotalDeaths;
      });
    }
  }

  toggleCasesCumulative() {
    this.sortBy = 'casesTotal';
    this.nameSortAsc = false;
    this.sortNewCasesDesc = false;
    this.sortDeathsTotalDesc = false;
    this.sortNewDeathsDesc = false;
    if (!this.sortCasesCumulativeDesc) {
      this.sortCasesCumulativeDesc = !this.sortCasesCumulativeDesc;
      this.countries.sort((a, b) => {
        return b.TotalConfirmed - a.TotalConfirmed;
      });
    } else {
      this.sortCasesCumulativeDesc = !this.sortCasesCumulativeDesc;
      this.countries.sort((a, b) => {
        return a.TotalConfirmed - b.TotalConfirmed;
      });
    }
  }
  toggleCasesNew() {
    this.sortBy = 'casesNew';
    this.nameSortAsc = false;
    this.sortCasesCumulativeDesc = false;
    this.sortDeathsTotalDesc = false;
    this.sortNewDeathsDesc = false;
    if (!this.sortNewCasesDesc) {
      this.sortNewCasesDesc = !this.sortNewCasesDesc;
      this.countries.sort((a, b) => {
        return b.NewConfirmed - a.NewConfirmed;
      });
    } else {
      this.sortNewCasesDesc = !this.sortNewCasesDesc;
      this.countries.sort((a, b) => {
        return a.NewConfirmed - b.NewConfirmed;
      });
    }
  }

  toggleNames() {
    this.sortBy = 'name';
    this.sortCasesCumulativeDesc = false;
    this.sortDeathsTotalDesc = false;
    this.sortNewCasesDesc = false;
    this.sortNewDeathsDesc = false;
    if (!this.nameSortAsc) {
      this.nameSortAsc = !this.nameSortAsc;
      this.countries.sort((a, b) => {
        if (a.Country < b.Country) { return -1; }
        return a.Country > b.Country ? 1 : 0;
      });
    } else {
      if (this.nameSortAsc) {
        this.nameSortAsc = !this.nameSortAsc;
        this.countries.sort((a, b) => {
          if (a.Country > b.Country) { return -1; }
          return a.Country < b.Country ? 1 : 0;
        });
      }
    }
  }


}
