import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeOnLanComponent } from './wake-on-lan.component';

describe('WakeOnLanComponent', () => {
  let component: WakeOnLanComponent;
  let fixture: ComponentFixture<WakeOnLanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WakeOnLanComponent]
    });
    fixture = TestBed.createComponent(WakeOnLanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
