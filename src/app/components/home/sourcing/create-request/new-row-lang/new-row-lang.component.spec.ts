import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRowLangComponent } from './new-row-lang.component';

describe('NewRowLangComponent', () => {
  let component: NewRowLangComponent;
  let fixture: ComponentFixture<NewRowLangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRowLangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRowLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
