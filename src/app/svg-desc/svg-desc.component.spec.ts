import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgDescComponent } from './svg-desc.component';

describe('SvgDescComponent', () => {
  let component: SvgDescComponent;
  let fixture: ComponentFixture<SvgDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
