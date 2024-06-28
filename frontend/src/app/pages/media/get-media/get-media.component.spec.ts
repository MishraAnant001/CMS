import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMediaComponent } from './get-media.component';

describe('GetMediaComponent', () => {
  let component: GetMediaComponent;
  let fixture: ComponentFixture<GetMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetMediaComponent]
    });
    fixture = TestBed.createComponent(GetMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
