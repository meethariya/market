import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSortComponent } from './review-sort.component';

describe('ReviewSortComponent', () => {
  let component: ReviewSortComponent;
  let fixture: ComponentFixture<ReviewSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
