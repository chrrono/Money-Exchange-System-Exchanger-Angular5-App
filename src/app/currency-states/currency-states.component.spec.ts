import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyStateComponent } from './currency-states.component';

describe('CurrencyStateComponent', () => {
  let component: CurrencyStateComponent;
  let fixture: ComponentFixture<CurrencyStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
