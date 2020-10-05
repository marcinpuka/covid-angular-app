import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() countries: Array<any>[];
  @Output() updateCountry: EventEmitter<any> = new EventEmitter();
  public searchInput: String = '';
  public searchResult: Array<any> = [];
  toggle: boolean;
  selectedInput: any;

  constructor() {
  }


  fetchCountry(event: any) {
    if (event.target.value === '') {
      this.updateCountry.emit('all');
      return this.searchResult = [];
    }
    this.searchResult = this.countries.filter((country) => {
      // tslint:disable-next-line: no-string-literal
      return country['Country'].toLowerCase().startsWith(event.target.value.toLowerCase());
    });
    this.toggle = false;
  }

  showDetails(selectedCountry) {

    this.selectedInput = selectedCountry;
    this.updateCountry.emit(selectedCountry);
    this.toggle = true;
    this.searchInput = selectedCountry.Country;
  }

  ngOnInit(): void {
    console.log(this.countries);
  }

}
