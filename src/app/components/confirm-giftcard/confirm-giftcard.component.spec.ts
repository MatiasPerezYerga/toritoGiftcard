import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmGiftcardComponent } from './confirm-giftcard.component';

describe('ConfirmGiftcardComponent', () => {
  let component: ConfirmGiftcardComponent;
  let fixture: ComponentFixture<ConfirmGiftcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmGiftcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmGiftcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
