import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiButtonComponent } from './midi-button.component';

describe('MidiButtonComponent', () => {
  let component: MidiButtonComponent;
  let fixture: ComponentFixture<MidiButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
