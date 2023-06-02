import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallDataComponent } from './small-data.component';

describe('SmallDataComponent', () => {
  let component: SmallDataComponent;
  let fixture: ComponentFixture<SmallDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
