import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappaCalabriaComponent } from './mappa-calabria.component';

describe('MappaCalabriaComponent', () => {
  let component: MappaCalabriaComponent;
  let fixture: ComponentFixture<MappaCalabriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappaCalabriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappaCalabriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
