import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAscComponent } from './svg-asc.component';

describe('SvgAscComponent', () => {
  let component: SvgAscComponent;
  let fixture: ComponentFixture<SvgAscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgAscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgAscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
