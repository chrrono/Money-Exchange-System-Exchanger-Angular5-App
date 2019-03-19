import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyStateListComponent } from './currency-state-list.component';

describe('CurrencyStateListComponent', () => {
  let component: CurrencyStateListComponent;
  let fixture: ComponentFixture<CurrencyStateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyStateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
