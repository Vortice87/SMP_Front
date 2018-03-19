import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRowReqFunctComponent } from './new-row-req-funct.component';

describe('NewRowReqFunctComponent', () => {
  let component: NewRowReqFunctComponent;
  let fixture: ComponentFixture<NewRowReqFunctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRowReqFunctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRowReqFunctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
