import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioExplorerComponent } from './audio-explorer.component';

describe('AudioExplorerComponent', () => {
  let component: AudioExplorerComponent;
  let fixture: ComponentFixture<AudioExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
